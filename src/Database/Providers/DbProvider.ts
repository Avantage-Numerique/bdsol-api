import mongoose from "mongoose";
import config from "@src/config";
import LogHelper from "@src/Monitoring/Helpers/LogHelper";
import type {Service} from "@database/Service";
import AbstractModel from "@core/Model";
import {DBDriver} from "@database/Drivers/DBDriver";


export interface DbProvider {
    connection:mongoose.Connection;
    services:Array<Service>;
    urlPrefix:string;
    url:string;
    databaseName:string;

    connect(driver:DBDriver):Promise<mongoose.Connection|undefined>;
    assign: (service:Service) => void;
}

/**
 * Abstract class to set the provider more dry and easy to extends.
 */
export abstract class BaseProvider implements DbProvider {

    protected _connection:mongoose.Connection;
    protected _service:Service;
    protected abstract _services:any;//object

    protected _urlPrefix:string;
    protected _url:string;
    protected _databaseName:string;
    protected _driver:DBDriver;

    protected _debug:boolean = config.mongooseDebug;

    abstract _models:Array<AbstractModel>;

    public verbose:boolean = true;


    constructor(driver:DBDriver, name='') {
        if (name !== "") {
            this.databaseName = name;
            this._driver = driver;
        }
    }


    /**
     * Singleton getter in the scope of the concrete provider.
     * @return {DbProvider}
     */
    public async connect():Promise<mongoose.Connection|undefined>
    {
        const url:string = `${this._driver.getConnectionBaseUrl()}${this._databaseName}`;
        if (this.verbose) LogHelper.info("[BD] Connect to url : ", url);
        try {

            mongoose.set('debug', this._debug);
            //@todo debug this, broke service create. https://thecodebarbarian.com/whats-new-in-mongoose-6-sanitizefilter.html
            //mongoose.set('sanitizeFilter', true);
            this.connection = await mongoose.createConnection(url);

            return this.connection;
        }
        catch (error:any)
        {
            LogHelper.error("Can't connect to db in provider");
            throw error;
        }
    }

    /**
     * @abstract
     * Assign models to the provider and stocks models in an array.
     * @param service {Service}
     */
    //abstract assign(service:Service):void;

    public assign(service:Service):void
    {
        try {

            if (this.verbose) LogHelper.info(`[DB] assigning ${service.constructor.name} to ${this.constructor.name}`);
            // we may can delete the model's provider property because everything is already handler within the model's connecion set here.

            service.appModel.provider = this;
            service.appModel.connection = this.connection;

            //this line connect the appModel to its mongoose models in the service scope.
            const succeedConnection = service.connectToMongoose();

            if (this.verbose) LogHelper.info(`[DB][${service.constructor.name}] CONNECTION TO Mongoose ${(succeedConnection ? "succeed" : "failed")}`);
            this.addService(service);
        }
        catch (error:any)
        {
            LogHelper.error(`[DB] Failed to assign ${service.constructor.name} to ${this.constructor.name}`);
            throw error;
        }
    }

    public async initServicesIndexes() {
        for (const service of this._services) {
            LogHelper.info(`[DB] provider Initiating indexes of ${service.constructor.name}`);
            service.appModel.registerIndexes();
        }
    }

    public async removeServicesIndexes() {
        for (const [serviceName, service] of this._services) {
            if (this.verbose) LogHelper.info(`[DB] Initiating indexes of ${serviceName}`);
            service.appModel.removeIndexes();
        }
    }

    /**
     * This is the models
     * @param model
     */
    public addModel(model:AbstractModel)
    {
        if (this._models === undefined && typeof this._models === "undefined") {
            this._models = [];
        }
        this._models.push(model);
    }


    //  GETTER / SETTER

    public get connection():any {
        return this._connection;
    }
    public set connection(connection) {
        this._connection = connection;
    }


    public get services():any {
        return this._services;
    }
    public set services(services:any) {
        this._services = services;
    }

    public addService(service:Service) {
        //this._services.push(service);
        this._services[service.constructor.name] = service;
    }


    public get urlPrefix():string {
        return this._urlPrefix;
    }
    public set urlPrefix(urlPrefix) {
        this._urlPrefix = urlPrefix;
    }


    public get url():string {
        if (this._url === '' || this._url === undefined) {
            this.url = `${this.urlPrefix}://${config.db.host}:${config.db.port}/${this._databaseName}`;
        }
        return this._url;
    }
    public set url(url) {
        this._url = url;
    }

    public get databaseName() {
        return this._databaseName;
    }

    public set databaseName(name) {
        this._databaseName = name;
    }
}
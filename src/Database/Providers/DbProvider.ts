import mongoose from "mongoose";
import config from "../../config";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import type {Service} from "../Service";
import AbstractModel from "../../Abstract/Model";


export interface DbProvider {
    connection:mongoose.Connection;
    service:Service|null;
    urlPrefix:string;
    url:string;
    databaseName:string;

    connect():Promise<mongoose.Connection|undefined>;
    assign: (model:AbstractModel) => void;
}

/**
 * Abstract class to set the provider more dry and easy to extends.
 */
export abstract class BaseProvider implements DbProvider {

    protected _connection:mongoose.Connection;
    protected _service:Service;

    protected _urlPrefix:string;
    protected _url:string;
    protected _databaseName:string;

    protected _debug:boolean = config.mongooseDebug;

    abstract _models:Array<AbstractModel>;




    constructor(name='') {
        if (name !== "") {
            this.databaseName = name;
        }
    }


    /**
     * Singleton getter in the scope of the concrete provider.
     * @return {DbProvider}
     */
    public async connect():Promise<mongoose.Connection|undefined>
    {
        LogHelper.info("[BD] Connect to url : ", this.url);
        try {
            const connectionOptions:any = {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            };
            mongoose.set('debug', this._debug);
            //@todo debug this, broke service create. https://thecodebarbarian.com/whats-new-in-mongoose-6-sanitizefilter.html
            //mongoose.set('sanitizeFilter', true);
            this.connection = await mongoose.createConnection(this.url, connectionOptions as mongoose.ConnectOptions);//

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
     * @param model
     */
    abstract assign(model:AbstractModel):void;


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


    public get service():any {
        return this._service;
    }
    public set service(service) {
        this._service = service;
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
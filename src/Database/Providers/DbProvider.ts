import mongoose from "mongoose";
import config from "../../config";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import type {Service} from "../Service";
import {ConnectOptions} from "mongodb";
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

    //do we need to keep trace of active models there ?
    //protected _models:array<AbstractModel>;


    constructor(name='') {
        if (name !== "") {
            this.databaseName = name;
        }
    }


    public async connect():Promise<mongoose.Connection|undefined>
    {
        LogHelper.log("Connect to url : ", this.url);
        try {
            const connectionOptions:any = {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            };
            this.connection = await mongoose.createConnection(this.url, connectionOptions as mongoose.ConnectOptions);//

            return this.connection;
        }
        catch (error:any)
        {
            LogHelper.error("Can't connect to db in provider");
            throw error;
        }

        return undefined;
    }

    abstract assign(model:AbstractModel):void;


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
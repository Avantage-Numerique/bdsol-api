import mongoose from "mongoose";
import config from "../../config";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import {Service} from "../Service";
import {ConnectOptions} from "mongodb";


export interface DbProvider {
    connection:mongoose.Connection;
    urlPrefix:string;
    url:string;
    databaseName:string;

    connect():Promise<mongoose.Connection|undefined>;
    getInstance():DbProvider|undefined;
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


    constructor(name='') {
        if (name !== "") {
            this.databaseName = name;
        }
    }


    public async connect():Promise<mongoose.Connection|undefined>
    {

        LogHelper.log("Connect to url : ", this.url);
        try {
            this.connection = await mongoose.createConnection(this.url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            } as ConnectOptions);

            return this.connection;
        }
        catch (error:any) {
            LogHelper.error("Can't connect to db in provider");
        }
        return undefined;
    }


    public getInstance(): DbProvider|undefined
    {
        //to overwrite.
        return undefined;
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
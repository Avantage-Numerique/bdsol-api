import mongoose from "mongoose";
import config from "../../config";
import LogHelper from "../../Monitoring/Helpers/LogHelper";


export default interface Provider {
    connection:mongoose.Connection;
    urlPrefix:string;
    url:string;
    databaseName:string;
    model:any;

    connect():Promise<mongoose.Connection|null>;
}

export class BaseProvider implements Provider {

    protected _connection:mongoose.Connection;
    protected _urlPrefix:string;
    protected _url:string;
    protected _databaseName:string;
    protected _model:any;


    constructor(name='') {
        if (name !== "") {
            this.databaseName = name;
        }
    }

    public connect():Promise<mongoose.Connection|null> {
        LogHelper.log(this.url);
        this.connection = mongoose.createConnection(this.url);
        return this.connection;
    }


    //  GETTER / SETTER


    public get model():any {
        return this._model;
    }
    public set model(model) {
        this._model = model;
    }


    public get connection():any {
        return this._connection;
    }
    public set connection(connection) {
        this._connection = connection;
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
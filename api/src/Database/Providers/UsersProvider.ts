import mongoose from "mongoose";
import config from "../../config";
import Provider from "./Provider";


export class UsersProvider implements Provider{

    private _connection:mongoose.Connection;
    private _urlPrefix:string;
    private _url:string;
    private _databaseName:string;

    constructor(name='users') {
        this.databaseName = name;
    }

    public connect():mongoose.Connection {
        this.connection = mongoose.createConnection(this.url);
        return this.connection;
    }


    //  GETTER / SETTER

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
        if (this._url === '') {
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
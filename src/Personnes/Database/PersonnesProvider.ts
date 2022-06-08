import mongoose from "mongoose";
import config from "../../config";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import {DbProvider} from "../../Database/DatabaseDomain";
import {ConnectOptions} from "mongodb";
import {User} from "../../Users/UsersDomain";
import {Service} from "../../Database/Service";


export class PersonnesProvider implements DbProvider {

    private _connection:mongoose.Connection;
    private _service:Service;
    private _model:any;

    private _urlPrefix:string;
    private _url:string;
    private _databaseName:string;

    private _singleton:PersonnesProvider;

    constructor(name='personnes') {
        this.databaseName = name;
        this.urlPrefix = "mongodb";
    }

    public getInstance():PersonnesProvider {
        if (this._singleton === null) {
            this._singleton = new PersonnesProvider(config.db.name);
        }
        return this._singleton;
    }

    public async connect():Promise<mongoose.Connection|undefined> {
        try {
            this.connection = await mongoose.createConnection(this.url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            } as ConnectOptions);

            User.connection = this.connection;
            this.model = User.getInstance();

            return this.connection;
        }
        catch (error:any) {
            LogHelper.error("Can't connect to db in PersonnesProvider");
        }
        return undefined;
    }


    //  GETTER / SETTER


    public get model():any {
        return this._model;
    }
    public set model(model) {
        this._model = model;
    }


    public get service():any {
        return this._service;
    }
    public set service(service) {
        this._service = service;
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
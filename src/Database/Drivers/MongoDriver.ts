import * as mongoDB from "mongodb";
import {MongoClient, ServerApiVersion} from "mongodb";
import config from "@src/config";
import LogHelper from "@src/Monitoring/Helpers/LogHelper";
import {buildConnectionUrlParams, getConnectionUrl, MongoDbUrlParamsContract} from "@database/Drivers/Connection";


export class MongoDBDriver {

    public driverPrefix: string;
    public isSRV: boolean;
    public authSource:string;
    public client: mongoDB.MongoClient;
    public db: string;
    public baseUrl: string;
    public providers: any;
    public config:any;
    public haveCredentials:boolean;
    public urlConfig:MongoDbUrlParamsContract;
    public timeOut:number;

    public plugins: any;

    /**
     * Constructor fo this driver. Object is created 1 time in  ServerController.
     */
    constructor(driverConfig?:any) {
        this.config = driverConfig ?? config.db;
        this.timeOut = 300;

        this.urlConfig = buildConnectionUrlParams(this.config);

        this.init();
    }

    /**
     * Method mandatory in DBDriver, to init this driver.
     */
    public async init() {
        const url:string = getConnectionUrl(this.urlConfig);
        LogHelper.info("URL Mongo Driver", this.urlToLog(url));
        this.client = new MongoClient(url, {
                connectTimeoutMS: this.timeOut,
                serverApi: {
                    version: ServerApiVersion.v1,
                    strict: true,
                    deprecationErrors: true,
                },
                auth: {
                    username: this.urlConfig.db.user,
                    password: this.urlConfig.db.password
                },
                authSource: this.urlConfig.db.authSource
            }
        );
    }

    public async connect() {
        LogHelper.info(`[DB][Driver][Mongo] Connexion du client au serveur mongodb`);
        await this.init();
        await this.client.connect();
        return this.client;
    }

    public async close() {
        await this.client?.close();
    }


    public urlToLog(uri:string):string {
        return prepareUriForLoging(uri);
    }
}


const prepareUriForLoging = (uri:string):string => {
    let creds = uri.slice(uri.indexOf('://')+3, uri.indexOf('@'));
    let noCreds = uri.split(creds);
    return noCreds.join("*****:*****");
}
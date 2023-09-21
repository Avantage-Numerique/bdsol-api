import * as mongoDB from "mongodb";
import {MongoClient, ServerApiVersion} from "mongodb";
import config from "@src/config";
import LogHelper from "@src/Monitoring/Helpers/LogHelper";
import {getConnectionBaseUrl, MongoDbUrlParamsContract} from "@database/Drivers/Connection";


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
    public connectionParams:MongoDbUrlParamsContract;

    public plugins: any;

    /**
     * Constructor fo this driver. Object is created 1 time in  ServerController.
     */
    constructor(driverConfig?:any) {
        this.config = driverConfig ?? config.db;
        this.driverPrefix = driverConfig?.prefix ?? config.db.prefix;
        this.haveCredentials = config.db.user !== '' && config.db.password !== '';
        this.authSource = config.db.authSource;
        this.db = driverConfig?.db ?? 'bdsol-data';
        this.baseUrl = '';
        this.isSRV = this.driverPrefix.includes('+srv');

        this.connectionParams = {
            driverPrefix:this.driverPrefix,
            haveCredentials:this.haveCredentials,
            isSRV:this.isSRV,
            db: this.config
        }
        this.init();
    }

    /**
     * Method mandatory in DBDriver, to init this driver.
     */
    public async init() {
        const url:string = getConnectionBaseUrl(this.connectionParams);

        this.client = new MongoClient(url, {
                serverApi: {
                    version: ServerApiVersion.v1,
                    strict: true,
                    deprecationErrors: true,
                },
                auth: {
                    username: this.connectionParams.db.user,
                    password: this.connectionParams.db.password
                },
                authSource: this.connectionParams.db.authSource
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
}
import * as mongoDB from "mongodb";
import config from "../../config";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import type {DBDriver} from "./DBDriver";
import {User} from "../../Users/UsersDomain";
import Deprecate_createUsersCollection from "../Seeders/deprecate_create-users-collection";


/**
 * @Deprecated
 * We use MongooseDriver instead to have an ODM
 *
 * Mongodb was a raw driver to manage mongodb without ODM/ORM.
 */
export class Deprecate_MongoDBDriver implements DBDriver {

    public driverPrefix: string;
    public client: mongoDB.MongoClient | null;
    public db: mongoDB.Db | null;
    public baseUrl: string;

    /**
     * Constructor fo this driver. Object is created 1 time in  ServerController.
     */
    constructor() {
        this.driverPrefix = 'mongodb-deprecated';
        this.client = null;
        this.db = null;
        this.baseUrl = '';
    }

    public async connect() {
        LogHelper.log(`[BD] Connexion à la base de données mongodb ${this.getConnectionUrl()}`);
        await this.initDb();
    }

    /**
     * Method mandatory in DBDriver, to init this driver.
     */
    public async initDb() {
        //await this.initMongoDb();;
    }

    /**
     * @Deprecated Will be use mongoose, but kept raw mongodb connection here in case. 2022-04-11
     * This is code to connect to mongo db directly. Without mongoose.
     * Keeping it for now. Because of mongoose is still in test.
     */
    public async initMongoDb() {

        try {

            this.client = new mongoDB.MongoClient(this.getConnectionUrl());
            LogHelper.log('[BD] connecting to ', this.getConnectionUrl());

            await this.client.connect();

            if (this.client) {

                this.db = this.client.db(config.db.name);
                LogHelper.log('[BD] Setting the default db ', config.db.name);

                //will create the fake user for now.
                const usersCollection = new Deprecate_createUsersCollection();
                usersCollection.db = this.db;
                await usersCollection.up();
            }

        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public getConnectionUrl(db:string='bdsol-users') {
        if (this.baseUrl === '') {
            this.baseUrl = `${this.driverPrefix}://${config.db.host}:${config.db.port}/${db}`;
        }
        return this.baseUrl;
    }


    public getCollection(name: string): any {
        if (this.db !== null) {
            return this.db.collection(name);
        }
        return null;
    }

    public getModel(name: string): any {
        if (this.db !== null && name === 'users') {
            return User.getInstance();
        }
        return null;
    }

    public onDbError(error: any) {
        LogHelper.error(error);
        throw new Error(error.message);
    }

}
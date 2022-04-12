import * as mongoDB from "mongodb";
import config from "../../config";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import CreateUsersCollection from "../../Migrations/create-users-collection";
import DBDriver from "./DBDriver";
import UserModel from "../../Users/Models/UserModel";
import mongoose from "mongoose";
import {ConnectOptions} from "mongodb";
import CreateDbAndUsersMongoose from "../../Migrations/create-db-and-users-mongoose";
import UsersService from "../../Users/Services/UsersService";
import User from "../../Users/Models/User";

export default class MongoDBDriver implements DBDriver {

    public driverPrefix: string;
    public client: mongoDB.MongoClient | null;
    public db: mongoDB.Db | mongoose.Connection | null;
    public baseUrl: string;

    /**
     * Constructor fo this driver. Object is created 1 time in  ServerController.
     */
    constructor() {
        this.driverPrefix = 'mongodb';
        this.client = null;
        this.db = null;
        this.baseUrl = '';
    }

    public async connect() {
        LogHelper.log(`Connexion à la base de données mongodb ${this.getConnectionUrl()}`);
        await this.initDb();
    }

    /**
     * Method mandatory in DBDriver, to init this driver.
     */
    public async initDb() {
        //await this.initMongoDb();
        await this.initMongoose();
    }

    /**
     * Connect mongoose to our mongodb serveur, setup error handling for it.
     */
    public async initMongoose() {
        try {
            LogHelper.log(`Connecting ...`);
            await mongoose.connect(this.getConnectionUrl(), {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            } as ConnectOptions);

            if (this.db === null) {
                this.db = mongoose.connection;
                this.db.on('error', this.onDbError);
            }

            let users = new UsersService(User.getInstance());
            let usersCollection = new CreateDbAndUsersMongoose(users);
            await usersCollection.up();
            //will create the fake user for now.

        } catch (error: any) {
            throw new Error(error.message);
        }
        LogHelper.log(`Moogoose a été initialisé`);
    }

    /**
     * @Deprecated Will be use mongoose, but kept raw mongodb connection here in case. 2022-04-11
     * This is code to connect to mongo db directly. Without mongoose.
     * Keeping it for now. Because of mongoose is still in test.
     */
    public async initMongoDb() {

        try {

            this.client = new mongoDB.MongoClient(this.getConnectionUrl());
            LogHelper.log('connecting to ', this.getConnectionUrl());

            await this.client.connect();

            if (this.client) {

                this.db = this.client.db(config.db.name);
                LogHelper.log('Setting the default db ', config.db.name);

                //will create the fake user for now.
                let usersCollection = new CreateUsersCollection();
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
            return UserModel;
        }
        return null;
    }

    public onDbError(error: any) {
        LogHelper.error(error);
        throw new Error(error.message);
    }

}
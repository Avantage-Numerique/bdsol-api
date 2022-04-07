import * as mongoDB from "mongodb";
import config from "../../config";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import CreateUsersCollection from "../../Migrations/create-users-collection";
import DBDriver from "./DBDriver";
import UserModel from "../../Users/Models/UserModel";
import mongoose from "mongoose";
import {ConnectOptions} from "mongodb";

export default class MongoDBDriver implements DBDriver {

    public driverPrefix: string;
    public client: mongoDB.MongoClient | null;
    public db: mongoDB.Db | mongoose.Connection | null;
    public baseUrl: string;

    constructor() {
        this.driverPrefix = 'mongodb';
        this.client = null;
        this.db = null;
        this.baseUrl = '';
    }

    public async connect() {
        LogHelper.log(`Connexion à la base de données mongodb ${this.getConnectionUrl()}`);
        this.initDb();
    }

    public async initDb() {
        //await this.initMongoDb();
        await this.initMongoose();
    }

    public async initMongoose() {
        try {
            //mongoose.Promise = global.Promise;

            mongoose.connect(this.getConnectionUrl(), {
                useNewUrlParser: true,
                //useFindAndModify: false,
                //useCreateIndex: true,
                useUnifiedTopology: true,
            } as ConnectOptions);

            if (this.db === null) {
                //Get the default connection
                this.db = mongoose.connection;
            }

            //Bind connection to error event (to get notification of connection errors)
            //this.db.on('error', this.onDbError);
            //db.on('error', console.error.bind(console, 'MongoDB connection error:'));

        } catch (error: any) {
            throw new Error(error.message);
        }
        LogHelper.log(`Moogoose a été initialisé`);
    }

    public async initMongoDb() {

        try {

            this.client = new mongoDB.MongoClient(this.getConnectionUrl());
            LogHelper.log('connecting to ', this.getConnectionUrl());

            await this.client.connect();

            if (this.client) {

                this.db = this.client.db(config.db.name);
                LogHelper.log('Setting the default db ', config.db.name);

                //will create the fake user for now.
                let usersCollection = new CreateUsersCollection(this.db);
                usersCollection.up();
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

    public onDbError(e: any) {
        LogHelper.error(e);
    }

}
import * as mongoDB from "mongodb";
import config from "../../config";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import DBDriver from "./DBDriver";
import mongoose from "mongoose";
import CreateDbAndUsersMongoose from "../../Migrations/create-db-and-users-mongoose";
import User from "../../Users/Models/User";
import {UsersProvider} from "../Providers/UsersProvider";
import {DataProvider} from "../Providers/DataProvider";

export default class MongooseDBDriver implements DBDriver {

    public driverPrefix: string;
    public client: mongoDB.MongoClient | null;
    public db: mongoDB.Db | mongoose.Connection | null;//will be the provider.
    public baseUrl: string;
    public providers: any;

    /**
     * Constructor fo this driver. Object is created 1 time in  ServerController.
     */
    constructor() {
        this.driverPrefix = 'mongodb';
        this.client = null;
        this.db = null;
        this.baseUrl = '';

        this.providers = {
            'users': new UsersProvider(config.users.db.name),
            'data': new DataProvider(config.db.name)
        };
    }

    public async connect() {
        LogHelper.info(`Connexion aux base de données ...`);
        await this.initDb();
    }

    /**
     * Method mandatory in DBDriver, to init this driver.
     */
    public async initDb() {
        //await this.initMongoose();

        LogHelper.info(`Connexion à la  base de données utilisateurs ...`);
        await this.providers.users.connect();

        LogHelper.info(`Connexion à la  base de données structurée, ouverte et liée ...`);
        await this.providers.data.connect();

        await this.generateFakeUsers();
    }

    /**
     * Connect mongoose to our mongodb serveur, setup error handling for it.
     */
    public async initMongoose() {
        try {

            // loop throught the providers to init here.

            LogHelper.log(`Connecting ...`);
            /*await mongoose.connect(this.getConnectionUrl(), {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            } as ConnectOptions);

            if (this.db === null) {
                this.db = mongoose.connection;
                this.db.on('error', this.onDbError);
            }*/

            await this.generateFakeUsers();

        } catch (error: any) {
            throw new Error(error.message);
        }
        LogHelper.log(`Moogoose a été initialisé`);
    }

    public async generateFakeUsers() {
        if (config.environnement === 'development') {
            //will create the fake users if the collection is empty.
            //let users = new UsersService(User.getInstance());
            let usersCollection = new CreateDbAndUsersMongoose(this.providers.users.service);
            await usersCollection.up();
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
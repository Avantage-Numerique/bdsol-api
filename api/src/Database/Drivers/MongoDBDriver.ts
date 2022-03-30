import * as mongoDB from "mongodb";
import config from "../../config";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import CreateUsersCollection from "../../Migrations/create-users-collection";
import DBDriver from "./DBDriver";
import UserModel from "../../Users/Models/UserModel";

export default class MongoDBDriver implements DBDriver {

    public driverPrefix: string;
    public client: mongoDB.MongoClient | null;
    public db: mongoDB.Db | null;

    constructor() {
        this.driverPrefix = 'mongodb';
        this.client = null;
        this.db = null;
    }

    public async connect() {
        LogHelper.log(`Connexion à la base de données mongodb ...`);
        try {
            let dbUrl = this.getConnectionUrl();
            this.client = new mongoDB.MongoClient(dbUrl);
            LogHelper.log('connecting to ', dbUrl);

            await this.client.connect();
            await this.initDb();

        } catch(error:any) {
            throw new Error(error.message);
        }
    }

    public initDb() {
        if (this.client) {
            this.db =  this.client.db(config.db.name);
            LogHelper.log('Setting the default db ', config.db.name);

            //will create the fake user for now.
            let usersCollection = new CreateUsersCollection(this.db);
            usersCollection.up();
        }
    }

    public getConnectionUrl() {
        return `${this.driverPrefix}://${config.db.host}:${config.db.port}`;
    }


    public getCollection(name:string):any {
        if (this.db !== null) {
            return this.db.collection(name);
        }
        return null;
    }

    public getModel(name:string):any {
        if (this.db !== null && name === 'users') {
            return UserModel;
        }
        return null;
    }

}
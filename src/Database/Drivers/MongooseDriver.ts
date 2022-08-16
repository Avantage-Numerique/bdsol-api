import * as mongoDB from "mongodb";
import config from "../../config";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import mongoose from "mongoose";
import type {DBDriver} from "./DBDriver";
import {UsersProvider} from "../Providers/UsersProvider";
import {DataProvider} from "../Providers/DataProvider";
import {User} from "../../Users/UsersDomain";

import CreateDbAndEntityMongoose from "../../Migrations/create-db-and-users-mongoose";
import Personne from "../../Personnes/Models/Personne";
import Organisation from "../../Organisations/Models/Organisation";
import Taxonomy from "../../Taxonomy/Models/Taxonomy";
import UserHistory from "../../UserHistory/Models/UserHistory";
/*import CreateDataMongoose from "../../Migrations/create-data-mongoose";
import { PersonnesController } from "../../Personnes/Controllers/PersonnesController";
import OrganisationsController from "../../Organisations/Controllers/OrganisationsController";
import { TaxonomyController } from "../../Taxonomy/Controllers/TaxonomyController";
import { UsersHistoryController } from "../../UserHistory/Controllers/UsersHistoryController";
import PersonnesService from "../../Personnes/Services/PersonnesService";
import OrganisationsService from "../../Organisations/Services/OrganisationsService";
import TaxonomyService from "../../Taxonomy/Services/TaxonomyService";
import UsersHistoryService from "../../UserHistory/Services/UsersHistoryService";*/
import {MongooseSlugUpdater} from "../Plugins/MongooseSlugUpdater";

export class MongooseDBDriver implements DBDriver {

    public driverPrefix: string;
    public client: mongoDB.MongoClient | null;
    public db: mongoDB.Db | mongoose.Connection | null;//will be the provider.
    public baseUrl: string;
    public providers: any;

    public plugins:any;

    /**
     * Constructor fo this driver. Object is created 1 time in  ServerController.
     */
    constructor() {
        this.driverPrefix = 'mongodb';
        this.client = null;
        this.db = null;
        this.baseUrl = '';

        this.providers = {
            'users': UsersProvider.getInstance(),
            'data': DataProvider.getInstance()
        };
    }

    public async configAddon() {
        const mongooseSlugPlugin = new MongooseSlugUpdater();//../
        await mongooseSlugPlugin.loadDependancy();
        mongooseSlugPlugin.assign(mongoose);
    }

    public async connect() {
        LogHelper.info(`[BD] Connexion aux base de données ...`);
        await this.initDb();
    }

    /**
     * Method mandatory in DBDriver, to init this driver.
     */
    public async initDb() {
        //await this.initMongoose();
        await this.configAddon();

        LogHelper.info(`[BD] Connexion à la base de données utilisateurs ...`);
        await this.providers.users.connect();

        LogHelper.info(`[BD] Connexion à la base de données structurée, ouverte et liée ...`);
        await this.providers.data.connect();

        this.providers.users.assign(User.getInstance());

        this.providers.data.assign(Personne.getInstance());
        this.providers.data.assign(Organisation.getInstance());

        this.providers.data.assign(Taxonomy.getInstance());
        this.providers.data.assign(UserHistory.getInstance());

        await this.generateFakeData();
    }

    public async generateFakeData() {
        if (config.environnement === 'development') {
            //will create the fake users if the collection is empty.
            const usersCollection = new CreateDbAndEntityMongoose(this.providers.users);
            await usersCollection.up();
            //const personData = new CreateDataMongoose(this.providers.data, Personne.getInstance());
            //await personData.up('person');
            /*const organisationData = new CreateDataMongoose(this.providers.data, Organisation.getInstance());
            await organisationData.up('organisation');
            const taxonomyData = new CreateDataMongoose(this.providers.data, Taxonomy.getInstance());
            await taxonomyData.up('taxonomy');
            const userHistoryData = new CreateDataMongoose(this.providers.data, UserHistory.getInstance());
            await userHistoryData.up('userHistory');*/
        }
    }

    /**
     * @deprecated
     * This is was used before providers.
     * @param db string to get the connection to mongo db.
     */
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
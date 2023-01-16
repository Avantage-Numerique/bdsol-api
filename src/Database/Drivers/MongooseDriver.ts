import * as mongoDB from "mongodb";
import config from "../../config";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import mongoose from "mongoose";
import type {DBDriver} from "./DBDriver";
import {UsersProvider} from "../Providers/UsersProvider";
import {DataProvider} from "../Providers/DataProvider";
import {User, UsersService} from "../../Users/UsersDomain";
import Person from "../../Persons/Models/Person";
import Organisation from "../../Organisations/Models/Organisation";
import Taxonomy from "../../Taxonomy/Models/Taxonomy";
import UserHistory from "../../UserHistory/Models/UserHistory";
import CreateDataMongoose from "../Seeders/create-data-mongoose";
import {MongooseSlugUpdater} from "../Plugins/MongooseSlugUpdater";
import PersonsService from "../../Persons/Services/PersonsService";
import OrganisationsService from "../../Organisations/Services/OrganisationsService";
import TaxonomyService from "../../Taxonomy/Services/TaxonomyService";
import UsersHistoryService from "../../UserHistory/Services/UsersHistoryService";
import type {Service} from "../Service";

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
        const mongooseSlugPlugin = new MongooseSlugUpdater();
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

        //this set connection in the provider
        await this.providers.users.connect();

        //LogHelper.info(`[BD] Connexion à la base de données structurée, ouverte et liée ...`);
        await this.providers.data.connect();

        //order is important for populate. If the schema in relation isn't declare before, it will not work.
        this.providers.users.assign(UsersService.getInstance(User.getInstance()));

        this.providers.data.assign(TaxonomyService.getInstance(Taxonomy.getInstance()));
        this.providers.data.assign(UsersHistoryService.getInstance(UserHistory.getInstance()));

        this.providers.data.assign(PersonsService.getInstance(Person.getInstance()));
        this.providers.data.assign(OrganisationsService.getInstance(Organisation.getInstance()));

        await this.generateFakeData();
    }

    public async generateFakeData()
    {
        if (config.environnement === 'development') {

            //will create the fake users if the collection is empty.
            //const usersCollection = new CreateDbAndEntityMongoose(this.providers.users.services.UsersService);
            //await usersCollection.up();

            const createDataTasks:Array<Service> = [
                this.providers.users.services.UsersService,
                this.providers.data.services.PersonsService,
                this.providers.data.services.OrganisationsService,
                this.providers.data.services.TaxonomyService,
                this.providers.data.services.UsersHistoryService,
                //this.providers.data.services.MediasService
            ]

            //Loop throught the services that need to be faked
            //Still need refactoring to drying scope of responsability in the seeder ? or in this.
            for (const targetService of createDataTasks) {
                await this.fakeTask(targetService);
            }
        }
    }

    private async fakeTask(service:Service) {

        // Fake Persons.
        try {
            const seeder = new CreateDataMongoose(service);
            await seeder.up();
        } catch(e:any) {
            LogHelper.raw("Mongoose Driver erreur in migration ", e);
            throw e;
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
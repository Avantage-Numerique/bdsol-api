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
import {MongooseSlugUpdater} from "../Plugins/MongooseSlugUpdater";
import PersonsService from "../../Persons/Services/PersonsService";
import OrganisationsService from "../../Organisations/Services/OrganisationsService";
import TaxonomyService from "../../Taxonomy/Services/TaxonomyService";
import UsersHistoryService from "../../UserHistory/Services/UsersHistoryService";
import type {Service} from "../Service";
import {fakeUser} from "../../Data/FakeEntities/fakeUser";
import {fakePersons} from "../../Data/FakeEntities/fakePerson";
import {fakeOrganisations} from "../../Data/FakeEntities/fakeOrganisations";
import {fakeUserHistories} from "../../Data/FakeEntities/fakeUserHistories";
import SeedData from "../Seeders/seed-data";

export class MongooseDBDriver implements DBDriver {

    public driverPrefix: string;
    public client: mongoDB.MongoClient | null;
    public db: mongoDB.Db | mongoose.Connection | null;//will be the provider.
    public baseUrl: string;
    public providers: any;

    public plugins: any;

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

        await this.seedDB();
    }


    public async seedDB() {
        LogHelper.info(`[BD][SEEDERS] Seeding DB for env : ${config.environnement}`);
        await this.generateFakeData();
        await this.addPersistantData();
    }


    public async addPersistantData() {

        LogHelper.info(`[BD][SEEDERS] Adding perdistant Data`);
        /*const persistantDataTasks: Array<Service> = [
            this.providers.data.services.TaxonomyService,
        ]

        for (const targetService of persistantDataTasks) {
            await this.seed(targetService);
        }*/
        /*const seedDataPair: { service: Service, data: any }[] = [
            {
                service: this.providers.users.services.TaxonomyService,
                data: fakeUser
            }
        ];

        //Loop through the services that need to be faked
        //Still need refactoring to drying scope of responsibility in the seeder ? or in this.
        for (const targetService of seedDataPair) {
            try {
                const seeder = new SeedData(targetService.service, targetService.data);
                await seeder.up();
            } catch (e: any) {
                LogHelper.raw("Mongoose Driver erreur in seeder ", e);
                throw e;
            }
        }*/
    }

    public async generateFakeData() {

        //seeder CreateDataMongoose do check for env value before seeding the data.
        if (config.environnement === 'development') {

            LogHelper.info(`[BD][SEEDERS] Adding fake data in development`);

            const seedDataPair: { service: Service, data: any, whereKeys: any }[] = [
                {
                    service: this.providers.users.services.UsersService,
                    data: fakeUser,
                    whereKeys: ['username']
                },
                {
                    service: this.providers.data.services.PersonsService,
                    data: fakePersons,
                    whereKeys: ['firstName', 'lastName']
                },
                {
                    service: this.providers.data.services.OrganisationsService,
                    data: fakeOrganisations,
                    whereKeys: ['name']
                },
                {
                    service: this.providers.data.services.UsersHistoryService,
                    data: fakeUserHistories,
                    whereKeys: []
                }
            ];

            //Loop through the services that need to be faked
            //Still need refactoring to drying scope of responsibility in the seeder ? or in this.
            for (const targetService of seedDataPair) {
                try {
                    const seeder = new SeedData(targetService.service, targetService.data, targetService.whereKeys);
                    LogHelper.info(`[BD][SEEDERS] SEEDING ${targetService.service.constructor.name} with ${targetService.data.constructor.name}`);
                    await seeder.up();
                } catch (e: any) {
                    LogHelper.raw(`[BD][SEEDERS][ERROR] Can't seed ${targetService.service.constructor.name} with ${targetService.data.constructor.name}`, e);
                    throw e;
                }
            }
        }
    }


    /**
     * @deprecated
     * This is was used before providers.
     * @param db string to get the connection to mongo db.
     */
    public getConnectionUrl(db: string = 'bdsol-users') {
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
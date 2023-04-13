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
import MediasService from "../../Media/Services/MediasService";
import Media from "../../Media/Models/Media";
import {fakeUser} from "../../Data/FakeEntities/fakeUser";
import {fakePersons} from "../../Data/FakeEntities/fakePerson";
import {fakeOrganisations} from "../../Data/FakeEntities/fakeOrganisations";
import {fakeUserHistories} from "../../Data/FakeEntities/fakeUserHistories";
import SeederTaskContract from "../Seeders/SeederTaskContract";
import {TaxonomiesPersistantData} from "../../Taxonomy/TaxonomiesPersistantData";
import SeedData from "../Seeders/seed-data";
import SeedPersistantData from "../Seeders/seed-persistant-data";
import ProjectsService from "../../Projects/Services/ProjectsService";
import Project from "../../Projects/Models/Project";


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
        await mongooseSlugPlugin.assign(mongoose);
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
        this.providers.data.assign(MediasService.getInstance(Media.getInstance()));
        this.providers.data.assign(UsersHistoryService.getInstance(UserHistory.getInstance()));

        this.providers.data.assign(PersonsService.getInstance(Person.getInstance()));
        this.providers.data.assign(OrganisationsService.getInstance(Organisation.getInstance()));
        this.providers.data.assign(ProjectsService.getInstance(Project.getInstance()));

        await this.seedDB();
    }

    /**
     * Async, Initiation step in MongooseDBDriver to seed the DB.
     * @return void
     */
    public async seedDB() {
        LogHelper.info(`[BD][SEEDERS] Seeding DB for env : ${config.environnement}`);
        await this.addPersistantData();
        await this.generateFakeData();
    }

    /**
     * In all environnement, seed the db with data.
     */
    public async addPersistantData() {

        LogHelper.info(`[BD][SEEDERS] Adding persistant Data`);

        const persistantDataTasks: Array<SeederTaskContract> = [
            {
                service: this.providers.data.services.TaxonomyService,
                data: TaxonomiesPersistantData,
                whereKeys: ['category', 'name']
            }
        ];
        await this.seedData(persistantDataTasks, SeedPersistantData);
    }

    /**
     * In environnement development, seed the bd with data to test things.
     * @return void
     */
    public async generateFakeData() {

        if (config.environnement === 'development') {

            LogHelper.info(`[BD][SEEDERS] Adding fake data in development`);

            const fakeDataTasks: Array<SeederTaskContract> = [
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
            await this.seedData(fakeDataTasks);
        }
    }

    /**
     * Factory seeders of data
     * @param tasks service - data and wheres to add the data.
     * @param seederClass the class to manage the seeding. Myst extend seedData.
     */
    public async seedData(tasks:Array<SeederTaskContract>, seederClass:typeof SeedData = SeedData) {

        //Loop through the services that need to be faked
        //Still need refactoring to drying scope of responsibility in the seeder ? or in this.
        for (const task of tasks) {
            try {
                const seeder = new seederClass(task.service, task.data, task.whereKeys);
                LogHelper.info(`[BD][SEEDERS][SEEDING] ${task.service.constructor.name} with ${task.data.constructor.name}`);
                await seeder.up();
            } catch (e: any) {
                LogHelper.raw(`[BD][SEEDERS][SEEDING][ERROR] Can't seed ${task.service.constructor.name} with ${task.data.constructor.name}`, e);
                throw e;
            }
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
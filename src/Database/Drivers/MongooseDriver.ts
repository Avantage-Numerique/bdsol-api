import * as mongoDB from "mongodb";
import config from "../../config";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import mongoose from "mongoose";
import type {DBDriver} from "./DBDriver";
import {UsersProvider} from "@database/Providers/UsersProvider";
import {DataProvider} from "@database/Providers/DataProvider";
import {MongooseSlugUpdater} from "@database/Plugins/MongooseSlugUpdater";
import {fakeUserHistories} from "@src/Data/FakeEntities/fakeUserHistories";
import SeederTaskContract from "@database/Seeders/SeederTaskContract";
import SeedData from "@database/Seeders/seed-data";
import SeedPersistantData from "@database/Seeders/seed-persistant-data";
import {User, UsersService} from "@src/Users/UsersDomain";
import Person from "@src/Persons/Models/Person";
import Organisation from "@src/Organisations/Models/Organisation";
import Taxonomy from "@src/Taxonomy/Models/Taxonomy";
import UserHistory from "@src/UserHistory/Models/UserHistory";
import PersonsService from "@src/Persons/Services/PersonsService";
import OrganisationsService from "@src/Organisations/Services/OrganisationsService";
import TaxonomyService from "@src/Taxonomy/Services/TaxonomyService";
import UsersHistoryService from "@src/UserHistory/Services/UsersHistoryService";
import MediasService from "@src/Media/Services/MediasService";
import Media from "@src/Media/Models/Media";
import {fakeUser} from "@src/Data/FakeEntities/fakeUser";
import {fakePersons} from "@src/Data/FakeEntities/fakePerson";
import {fakeOrganisations} from "@src/Data/FakeEntities/fakeOrganisations";
import ProjectsService from "@src/Projects/Services/ProjectsService";
import Project from "@src/Projects/Models/Project";
import {TaxonomiesPersistantData} from "@src/Taxonomy/TaxonomiesPersistantData";


export class MongooseDBDriver implements DBDriver {

    public driverPrefix: string;
    public client: mongoDB.MongoClient | null;
    public db: mongoDB.Db | mongoose.Connection | null;//will be the provider.
    public baseUrl: string;
    public providers: any;
    public config:any;

    public plugins: any;

    /**
     * Constructor fo this driver. Object is created 1 time in  ServerController.
     */
    constructor(driverConfig?:any) {
        this.driverPrefix = 'mongodb';
        this.client = null;
        this.db = null;
        this.baseUrl = '';
        this.config = driverConfig ?? config.db;

        this.providers = {
            users: UsersProvider.getInstance(this),
            data: DataProvider.getInstance(this)
        };
    }

    public async configAddon() {
        const mongooseSlugPlugin= new MongooseSlugUpdater();
        await mongooseSlugPlugin.assign(mongoose);
    }

    public async connect() {
        LogHelper.info(`[BD] Connexion aux bases de données ...`);
        await this.initDb();
    }

    /**
     * Method mandatory in DBDriver, to init this driver.
     */
    public async initDb() {
        //await this.initMongoose();
        await this.configAddon();

        //LogHelper.info(`[BD] Connexion à la base de données utilisateurs ...`);

        //this set connection in the provider
        await this.providers.users.connect(this);

        //LogHelper.info(`[BD] Connexion à la base de données structurée, ouverte et liée ...`);
        await this.providers.data.connect(this);

        //order is important for populate. If the schema in relation isn't declare before, it will not work.
        this.providers.users.assign(UsersService.getInstance(User.getInstance()));

        this.providers.data.assign(TaxonomyService.getInstance(Taxonomy.getInstance()));
        this.providers.data.assign(MediasService.getInstance(Media.getInstance()));
        this.providers.data.assign(UsersHistoryService.getInstance(UserHistory.getInstance()));

        this.providers.data.assign(PersonsService.getInstance(Person.getInstance()));
        this.providers.data.assign(OrganisationsService.getInstance(Organisation.getInstance()));
        this.providers.data.assign(ProjectsService.getInstance(Project.getInstance()));

        //await this.seedDB();
    }

    public async setupIndexes() {
        await this.providers.users.initServicesIndexes();
        await this.providers.data.initServicesIndexes();
    }

    public async removeIndexes() {
        //this.providers.users.removeServicesIndexes();
        //this.providers.data.removeServicesIndexes();
    }

    /**
     * Async, Initiation step in MongooseDBDriver to seed the DB.
     * @return void
     */
    public async seedDB() {
        LogHelper.info(`[BD][SEEDERS] Seeding DB for env : ${config.environnement}`);
        //await this.addPersistantData();
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
            this.baseUrl = `${this.driverPrefix}://${this.config.host}:${this.config.port}/${db}`;
        }
        return this.baseUrl;
    }

    /**
     * This is was used before providers.
     */
    public getConnectionBaseUrl() {
        if (this.baseUrl === '') {
            this.baseUrl = `${this.driverPrefix}://${this.config.host}:${this.config.port}/`;
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
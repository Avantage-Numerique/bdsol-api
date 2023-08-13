import * as mongoDB from "mongodb";
import config from "../../config";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import mongoose from "mongoose";
import type {DBDriver} from "./DBDriver";
import {UsersProvider} from "@database/Providers/UsersProvider";
import {DataProvider} from "@database/Providers/DataProvider";
import {MongooseSlugUpdater} from "@database/Plugins/MongooseSlugUpdater";
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
import ProjectsService from "@src/Projects/Services/ProjectsService";
import Project from "@src/Projects/Models/Project";


export class MongooseDBDriver implements DBDriver {

    public driverPrefix: string;
    public isSRV: boolean;
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
        this.driverPrefix = driverConfig?.prefix ?? config.db.prefix;
        this.client = null;
        this.db = null;
        this.baseUrl = '';
        this.config = driverConfig ?? config.db;
        this.isSRV = this.driverPrefix.includes('+srv');// check if the prefix contain the srv. to adjust the baseUrl.
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
     * @deprecated
     * This is was used before providers.
     * @param db string to get the connection to mongo db.
     */
    public getConnectionUrl(db:string='bdsol-users') {
        if (this.baseUrl === '') {
            this.baseUrl = `${this.getConnectionBaseUrl()}${db}`;
        }
        return this.baseUrl;
    }

    /**
     * This is was used before providers.
     */
    public getConnectionBaseUrl() {
        if (this.baseUrl === '') {
            const credential = config.db.user !== '' && config.db.password !== '' ? `${config.db.user}:${config.db.password}@` : '';
            if (this.isSRV) {
                this.baseUrl = `${this.driverPrefix}://${credential}${this.config.host}/`;
            }
            this.baseUrl = `${this.driverPrefix}://${credential}${this.config.host}:${this.config.port}/`;
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
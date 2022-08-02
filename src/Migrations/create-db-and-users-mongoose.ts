import LogHelper from "../Monitoring/Helpers/LogHelper";
import {fakeUser} from "./FakeEntity/fakeUser";
import {fakePerson} from "./FakeEntity/fakePerson";
import {fakeOrganisation} from "./FakeEntity/fakeOrganisation";
import {fakeTaxonomy} from "./FakeEntity/fakeTaxonomy";
import {fakeUserHistory} from "./FakeEntity/fakeUserHistory";
import config from "../config";
import {DbProvider, Service} from "../Database/DatabaseDomain";
import type {MigrationContract} from "../Database/DatabaseDomain";
import {User} from "../Users/Models/User";
import Personne from "../Personnes/Models/Personne";
import Organisation from "../Organisations/Models/Organisation";
import UserHistory from "../UserHistory/Models/UserHistory";
import Taxonomy from "../Taxonomy/Models/Taxonomy";

export default class CreateDbAndEntityMongoose implements MigrationContract {

    public usersService:Service|null;
    public provider:DbProvider|null;

    constructor(provider:DbProvider|null = null)
    {
        //LogHelper.log(`CreateDbAndUsersMongoose ${service} création`);
        this.provider = provider;
    }

    public async userConditions():Promise<boolean> {
        if (this.provider !== null) {
            const userModel:User = User.getInstance();
            const userCount:number = await this.provider.connection.collection(userModel.collectionName).countDocuments();
            LogHelper.info(`Conditions for Migration ${CreateDbAndEntityMongoose.name} checks`, "usercount", userCount);
            return config.environnement === 'development' &&
                userCount <= 0;
        }
        return false;
    }

    public async personConditions():Promise<boolean> {
        if (this.provider !== null) {
            const personModel:Personne = Personne.getInstance();
            const personCount:number = await this.provider.connection.collection(personModel.collectionName).countDocuments();
            LogHelper.info(`Conditions for Migration ${CreateDbAndEntityMongoose.name} checks`, "personcount", personCount);
            return config.environnement === 'development' &&
                personCount <= 0;
        }
        return false;
    }
    public async organisationConditions():Promise<boolean> {
        if (this.provider !== null) {
            const organisationModel:Organisation = Organisation.getInstance();
            const organisationCount:number = await this.provider.connection.collection(organisationModel.collectionName).countDocuments();
            LogHelper.info(`Conditions for Migration ${CreateDbAndEntityMongoose.name} checks`, "organisationcount", organisationCount);
            return config.environnement === 'development' &&
                organisationCount <= 0;
        }
        return false;
    }
    public async taxonomyConditions():Promise<boolean> {
        if (this.provider !== null) {
            const taxonomyModel:Taxonomy = Taxonomy.getInstance();
            const taxonomyCount:number = await this.provider.connection.collection(taxonomyModel.collectionName).countDocuments();
            LogHelper.info(`Conditions for Migration ${CreateDbAndEntityMongoose.name} checks`, "taxonomycount", taxonomyCount);
            return config.environnement === 'development' &&
                taxonomyCount <= 0;
        }
        return false;
    }
    public async userHistoryConditions():Promise<boolean> {
        if (this.provider !== null) {
            const userHistoryModel:UserHistory = UserHistory.getInstance();
            const userHistoryCount:number = await this.provider.connection.collection(userHistoryModel.collectionName).countDocuments();
            LogHelper.info(`Conditions for Migration ${CreateDbAndEntityMongoose.name} checks`, "userHistorycount", userHistoryCount);
            return config.environnement === 'development' &&
                userHistoryCount <= 0;
        }
        return false;
    }

    public async up()
    {
        if (await this.userConditions()) {
            LogHelper.log(`Appel de la migration ${CreateDbAndEntityMongoose.name}`);
            await this.fake('user');
        }
        if (await this.personConditions()) {
            LogHelper.log(`Appel de la migration ${CreateDbAndEntityMongoose.name}`);
            await this.fake('person');
        }
        if (await this.organisationConditions()) {
            LogHelper.log(`Appel de la migration ${CreateDbAndEntityMongoose.name}`);
            await this.fake('organisation');
        }
        if (await this.taxonomyConditions()) {
            LogHelper.log(`Appel de la migration ${CreateDbAndEntityMongoose.name}`);
            await this.fake('taxonomy');
        }
        if (await this.userHistoryConditions()) {
            LogHelper.log(`Appel de la migration ${CreateDbAndEntityMongoose.name}`);
            await this.fake('userHistory');
        }
    }

    public async down()
    {
        //clear fake
        //clear document ?
    }


    public async fake(entity:any)
    {
        if (this.provider !== null && this.provider.service !== null && this.provider.service.model !== null){
            switch (entity){
                case 'user' :
                    LogHelper.log("Ajout de users à la BD");
                    await this.provider.service.insert(fakeUser);
                    break;
                case 'person' : 
                    LogHelper.log("Ajout de person à la BD");
                    await this.provider.service.insert(fakePerson);
                    break;
                case 'organisation' : 
                    LogHelper.log("Ajout de organisation à la BD");
                    await this.provider.service.insert(fakeOrganisation);
                    break;
                case 'taxonomy' : 
                    LogHelper.log("Ajout de taxonomy à la BD");
                    await this.provider.service.insert(fakeTaxonomy);
                    break;
                case 'userHistory' : 
                    LogHelper.log("Ajout de userHistory à la BD");
                    await this.provider.service.insert(fakeUserHistory);
                    break;
                default: break;
            }
        }
        return false;
    }



    public onUp(error:any, result:any)
    {
        LogHelper.error(error, result);
    }

    public onDown(error:any, result:any)
    {
        LogHelper.error(error, result);
    }
}
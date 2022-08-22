import LogHelper from "../Monitoring/Helpers/LogHelper";
import config from "../config";
import {DbProvider, Service} from "../Database/DatabaseDomain";
import type {MigrationContract} from "../Database/DatabaseDomain";
import {fakeUser} from "./FakeEntity/fakeUser";
import {fakePersons, fakePerson} from "./FakeEntity/fakePerson";
import {fakeOrganisation as fakeOrganisations} from "./FakeEntity/fakeOrganisation";
import {fakeTaxonomy as fakeTaxonomies} from "./FakeEntity/fakeTaxonomy";
import {fakeUserHistory as fakeUserHistories} from "./FakeEntity/fakeUserHistory";
import AbstractModel from "../Abstract/Model";

export default class CreateDataMongoose implements MigrationContract {

    public provider:DbProvider;
    public model:AbstractModel;
    public service:Service;

    constructor(provider:DbProvider, model:AbstractModel) {
        this.provider = provider
        this.model = model;
    }

    public async conditions():Promise<boolean>
    {
        if (this.provider !== null)
        {
            const count:number = await this.provider.connection.collection(this.model.collectionName).countDocuments();
            LogHelper.info(`Conditions for Migration ${CreateDataMongoose.name} checks`, "count "+ this.model.collectionName, count);
            return config.environnement === 'development' &&
                count <= 0;
        }
        return false;
    }

    public async up(entity:string) {
        if (await this.conditions()) {
            LogHelper.log(`Appel de la migration ${CreateDataMongoose.name}`);
            await this.fake(entity);
        }
    }

    public async down()
    {
        //clear fake
        //clear document ?
    }

    public async fake(entity:string)
    {
        LogHelper.warn("Dans Fake");
        console.log(this.model.mongooseModel);
        if (this.model !== null){// && this.provider.service !== null && this.provider.service.model !== null){
            LogHelper.log("Ajout de " + this.model.collectionName + " à la BD");
            switch(entity){
                case 'user':
                    //await this.provider.service.model.insertMany(fakeUser);
                    break;
                case 'person':
                    //await this.model.mongooseModel.insertMany(fakePersons);
                    //await this.provider.service.insert(fakePerson);

                    break;
                case 'organisation':
                    //await this.provider.service.model.insertMany(fakeOrganisations);
                    break;
                case 'taxonomy':
                    //await this.provider.service.model.insertMany(fakeTaxonomies);
                    break;
                case 'userHistory':
                    //await this.provider.service.model.insertMany(fakeUserHistories);
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
import LogHelper from "../Monitoring/Helpers/LogHelper";
import config from "../config";
import {DbProvider, Service} from "../Database/DatabaseDomain";
import type {MigrationContract} from "../Database/DatabaseDomain";
import {fakeUser} from "./FakeEntity/fakeUser";
import {fakePerson} from "./FakeEntity/fakePerson";
import {fakeOrganisation} from "./FakeEntity/fakeOrganisation";
import {fakeTaxonomy} from "./FakeEntity/fakeTaxonomy";
import {fakeUserHistory} from "./FakeEntity/fakeUserHistory";
import AbstractModel from "../Abstract/Model";
import AbstractController from "../Abstract/Controller";

export default class CreateDataMongoose implements MigrationContract {

    public service:Service;
    public controller:AbstractController;
    public model:AbstractModel;

    constructor(controller:AbstractController, model:AbstractModel, service:Service) {
        this.controller = controller;
        this.model = model;
        this.service = service;
    }

    public async conditions():Promise<boolean> {
        if (this.model.provider !== null) {
            const count:number = await this.model.provider.connection.collection(this.model.collectionName).countDocuments();
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
        if (this.model.provider !== null && this.model.provider.service !== null && this.model.provider.service.model !== null){
            LogHelper.log("Ajout de " + this.model.collectionName + " à la BD");
            switch(entity){
                case 'user':
                    await this.service.insert(fakeUser);
                    break;
                case 'person':
                    await this.service.insert(fakePerson);
                    break;
                case 'organisation':
                    await this.service.insert(fakeOrganisation);
                    break;
                case 'taxonomy':
                    await this.service.insert(fakeTaxonomy);
                    break;
                case 'userHistory':
                    await this.service.insert(fakeUserHistory);
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
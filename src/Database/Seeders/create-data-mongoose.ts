import LogHelper from "../../Monitoring/Helpers/LogHelper";
import config from "../../config";
import {Service} from "../DatabaseDomain";
import {fakeUser} from "../../Data/FakeEntities/fakeUser";
import {fakePersons} from "../../Data/FakeEntities/fakePerson";
import {fakeOrganisations} from "../../Data/FakeEntities/fakeOrganisations";
import {fakeTaxonomies} from "../../Data/FakeEntities/fakeTaxonomies";
import {fakeUserHistories} from "../../Data/FakeEntities/fakeUserHistories";
import {ApiResponseContract} from "../../Http/Responses/ApiResponse";
import {ErrorResponse} from "../../Http/Responses/ErrorResponse";
import {StatusCodes} from "http-status-codes";
import {SeederContract} from "../Contracts/SeederContract";

export default class CreateDataMongoose implements SeederContract {

    public service: Service;

    constructor(service: Service) {
        this.service = service;
    }

    public async conditions(): Promise<boolean> {
        if (this.service.appModel.connection !== null) {
            const count: number = await this.service.appModel.connection.collection(this.service.appModel.collectionName).countDocuments();
            LogHelper.info(`[DB][SEEDERS] Conditions for Migration ${CreateDataMongoose.name} checks`, "count " + this.service.appModel.collectionName, count);
            return config.environnement === 'development' &&
                count <= 0;
        }
        return false;
    }

    public async up() {
        if (await this.conditions()) {
            LogHelper.info(`[DB][SEEDERS] Appel de la migration ${CreateDataMongoose.name}`);
            await this.fake();
        }
    }

    public async down() {
        //clear fake
        //clear document ?
    }

    public async fake(): Promise<ApiResponseContract> {
        //const entity:string = "none";
        //Mongoose insertMany don't call the pre-Save events that our slugs all depends on. We use create (inside the service.insert function.).
        switch (this.service.appModel.collectionName) {
            case 'user':
                return await this.service.insert(fakeUser);

            case 'personnes':
                return await this.service.insert(fakePersons);

            case 'organisations':
                return await this.service.insert(fakeOrganisations);

            case 'taxonomies':
                return await this.service.insert(fakeTaxonomies);

            case 'userhistories':
                return await this.service.insert(fakeUserHistories);

            default:
                return ErrorResponse.create(
                    new Error('Collection name not supported in create data mongoose'),
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    'Collection name not supported in create data mongoose'
                );

        }
    }

    public onUp(error: any, result: any) {
        LogHelper.error(error, result);
    }

    public onDown(error: any, result: any) {
        LogHelper.error(error, result);
    }
}
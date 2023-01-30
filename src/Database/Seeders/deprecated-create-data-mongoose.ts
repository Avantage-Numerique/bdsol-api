import LogHelper from "../../Monitoring/Helpers/LogHelper";
import {Seeder} from "./Seeder";
import config from "../../config";
import {fakeUser} from "../../Data/FakeEntities/fakeUser";
import {fakePersons} from "../../Data/FakeEntities/fakePerson";
import {fakeOrganisations} from "../../Data/FakeEntities/fakeOrganisations";
import {TaxonomiesPersistantData} from "../../Taxonomy/TaxonomiesPersistantData";
import {fakeUserHistories} from "../../Data/FakeEntities/fakeUserHistories";
import {ApiResponseContract} from "../../Http/Responses/ApiResponse";
import {ErrorResponse} from "../../Http/Responses/ErrorResponse";
import {StatusCodes} from "http-status-codes";
import {SeederContract} from "../Contracts/SeederContract";
import {Service} from "../Service";

export default class CreateDataMongoose extends Seeder implements SeederContract {

    name = "Create fake Data for dev.";
    service = {} as Service;//To satisfy typescript that don't want to have this set in the constructor in the first place.

    constructor(service:Service) {
        super();
        this.service = service;
    }

    public async seederConditions(): Promise<boolean>
    {
        return config.isDevelopment && this.collectionEmpty();
    }

    public async seed(): Promise<void>
    {
        LogHelper.info(`[DB][SEEDERS] Appel de la migration ${CreateDataMongoose.name}`);

        await this.fake();
        
        //Insert permanent taxonomies
        if (this.service.appModel.collectionName == "taxonomies") {
            TaxonomiesPersistantData.forEach( (taxonomy) => {
                this.service.persistantData( taxonomy );
            });
        }
    }

    public async unSeed() {
        //clear fake
        //clear document ?
    }

    public async fake(): Promise<ApiResponseContract> {
        //const entity:string = "none";
        //Mongoose insertMany don't call the pre-Save events that our slugs all depends on. We use create (inside the service.insert function.).
        switch (this.service.appModel.collectionName) {
            case 'users':
                return await this.service.insert(fakeUser);

            case 'people':
                return await this.service.insert(fakePersons);

            case 'organisations':
                return await this.service.insert(fakeOrganisations);

            //case 'taxonomies':
                //return await this.service.insert(TaxonomiesPersistantData);

            case 'userhistories':
                return await this.service.insert(fakeUserHistories);

            default:
                return ErrorResponse.create(
                    new Error('Collection name not supported in seeder : create data mongoose'),
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    'Collection name not supported in seeder : create data mongoose'
                );

        }
    }

}
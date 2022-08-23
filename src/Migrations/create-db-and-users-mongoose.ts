import LogHelper from "../Monitoring/Helpers/LogHelper";
import {fakeUser} from "./FakeEntity/fakeUser";
import config from "../config";
import {DbProvider, Service} from "../Database/DatabaseDomain";
import type {MigrationContract} from "../Database/DatabaseDomain";
import {ApiResponseContract} from "../Http/Responses/ApiResponse";
import {ErrorResponse} from "../Http/Responses/ErrorResponse";
import {StatusCodes} from "http-status-codes";


export default class CreateDbAndEntityMongoose implements MigrationContract {

    public provider:DbProvider;
    public service:Service;

    constructor(service:Service)
    {
        //LogHelper.log(`CreateDbAndUsersMongoose ${service} création`);
        //this.provider = provider;
        this.service = service;
    }

    public async conditions():Promise<boolean>
    {
        if (this.service !== null && this.service.appModel !== null && this.service.appModel.connection !== null)
        {
            const userCount:number = await this.service.appModel.connection.collection(this.service.appModel.collectionName).countDocuments();
            LogHelper.info(`[DB][SEEDERS] Conditions for Migration ${CreateDbAndEntityMongoose.name} checks`, "usercount", userCount);

            return config.environnement === 'development' &&
                userCount <= 0;
        }
        return false;
    }

    public async up()
    {
        if (await this.conditions())
        {
            LogHelper.log(`[DB][SEEDERS] Appel de la migration ${CreateDbAndEntityMongoose.name}`);
            await this.fake();
        }
    }

    public async down()
    {
        //clear fake
        //clear document ?
    }

    public async fake(): Promise<ApiResponseContract>
    {
        if (this.service !== null && this.service.model !== null){
            return await this.service.insert(fakeUser);
        }
        return ErrorResponse.create(
            new Error('Service no set in create db and users mongoose.'),
            StatusCodes.INTERNAL_SERVER_ERROR,
            'Service no set in create db and users mongoose.'
        );
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
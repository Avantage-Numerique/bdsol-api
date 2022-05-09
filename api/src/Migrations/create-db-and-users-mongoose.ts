import LogHelper from "../Monitoring/Helpers/LogHelper";
import {fakeUsers} from "../Users/fakeUsers";
import config from "../config";
import mongoose from "mongoose";
import {Service} from "../Database/DatabaseDomain";
import type {MigrationContract} from "../Database/DatabaseDomain";

export default class CreateDbAndUsersMongoose implements MigrationContract {

    public usersService:Service|null;

    constructor(service:Service|null = null) {
        this.usersService = service;
    }

    public async up()
    {
        LogHelper.log(`Appel de la migration ${CreateDbAndUsersMongoose.name}`);
        await this.fake();
    }

    public async down()
    {
        //clear fake
        //clear document ?
    }

    public async fake()
    {
        if (config.environnement === 'development'
            && this.usersService !== null) {

            LogHelper.log(`Migration ${CreateDbAndUsersMongoose.name} en cours`);
            const userCount:number = await mongoose.connection.db.collection('users').count();

            if (userCount <= 0) {

                LogHelper.log(`Aucun utilisateurs de créer, on ajoute deux utilisateurs test pour l'environnement ${config.environnement}`);
                await this.usersService.model.insertMany(fakeUsers);
                return true
            }
        }
        LogHelper.log(`No need to execute Migration ${CreateDbAndUsersMongoose.name}`);
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
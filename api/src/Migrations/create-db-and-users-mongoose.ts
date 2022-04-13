import LogHelper from "../Monitoring/Helpers/LogHelper";
import {fakeUsers} from "../Users/fakeUsers";
import config from "../config";
import {MigrationContract} from "../Database/Contracts/Migration";
import mongoose from "mongoose";
import Service from "../Database/Service";

export default class CreateDbAndUsersMongoose implements MigrationContract {

    public usersService:Service|null;

    constructor(service:Service|null = null) {
        this.usersService = service;
    }

    public async up() {

        LogHelper.log(`Migration ${CreateDbAndUsersMongoose.name} en cours`);
        await this.fake();

    }

    public async down() {
        //clear fake
        //clear document ?
    }

    public async fake() {
        if (config.environnement === 'development'
            && this.usersService !== null) {

            let userCount:Number = await mongoose.connection.db.collection('users').count();
            LogHelper.log(`fake ${config.users.db.name} count ${userCount}`);
            if (userCount <= 0) {

                LogHelper.log(`Aucun utilisateurs de créer, on ajoute deux utilisateurs test pour l'environnement ${config.environnement}`);
                await this.usersService.model.insertMany(fakeUsers);
                return true
            }
        }
        return false;
    }


    public onUp(error:any, result:any) {
        LogHelper.error(error, result);
    }

    public onDown(error:any, result:any) {
        LogHelper.error(error, result);
    }
}
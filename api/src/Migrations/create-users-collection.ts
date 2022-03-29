import * as mongoDB from "mongodb";
import LogHelper from "../Monitoring/Helpers/LogHelper";
import {fakeUsers} from "../Users/fakeUsers";
import config from "../config";
import {Migration} from "../Database/Migration";


export default class CreateUsersCollection implements Migration {

    db: mongoDB.Db;
    name: string = 'users';
    collection: mongoDB.Collection | null;

    constructor(db: mongoDB.Db) {
        this.db = db;
        this.collection = null;
    }

    public async up() {

        this.collection = this.db.collection(this.name);
        await this.fake();
    }

    public onUp(error:any, result:any) {
        LogHelper.error(error, result);
    }

    public async down() {
        //clear fake
        //clear document ?
    }

    public onDown(error:any, result:any) {
        LogHelper.error(error, result);
    }

    public async fake() {
        if (config.environnement === 'development'
            && this.collection !== null) {

            let userCount = await this.collection.countDocuments();
            if (userCount <= 0) {
                await this.collection.insertMany(fakeUsers);
                return true
            }
        }
        return false;
    }

}
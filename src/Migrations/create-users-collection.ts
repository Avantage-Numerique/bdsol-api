import * as mongoDB from "mongodb";
import LogHelper from "../Monitoring/Helpers/LogHelper";
import {fakeUser} from "./FakeEntity/fakeUser";
import config from "../config";
import {MigrationContract} from "../Database/Contracts/Migration";


export default class CreateUsersCollection implements MigrationContract {

    db: mongoDB.Db | null;
    name: string = 'users';
    model: mongoDB.Collection | null;

    constructor(model:any=null) {
        this.db = null;
        this.model = model;
    }

    public async up() {
        if (this.db !== null) {
            this.model = this.db.collection(this.name);
            await this.fake();
        }
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
            && this.model !== null) {

            let userCount = await this.model.countDocuments();
            if (userCount <= 0) {
                await this.model.insertMany(fakeUser as any);
                return true
            }
        }
        return false;
    }

}
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import DBDriver from "./DBDriver";
import FakeUserModel from "../../Users/Models/FakeUserModel";
import {fakeUsers} from "../../Users/fakeUsers";

export default class FakeUserDBDriver implements DBDriver {

    public driverPrefix: string;
    public client: any | null;
    public db: any | null;

    constructor() {
        this.driverPrefix = 'fakeusers';
        this.client = "fake";
        this.db = "fake";
    }

    public async connect() {
        LogHelper.log('Faker User Driver usen, passing the connecting process.');
    }

    public initDb() {

    }

    public getConnectionUrl() {
        return "";
    }

    public getCollection(name:string):any {
        if (name === 'users') {
            return fakeUsers;
        }
    }

    public getModel(name:string):any {
        if (this.db !== null && name === "users") {
            return FakeUserModel;
        }
        return null;
    }

}
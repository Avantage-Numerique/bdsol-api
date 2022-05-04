import LogHelper from "../../Monitoring/Helpers/LogHelper";
import {DBDriver} from "../DatabaseDomain";
import {FakeUserModel, fakeUsers} from "../../Users/UsersDomain";
import ServerController from "../../Server/Controllers/ServerController";

export class FakeUserDBDriver implements DBDriver {

    public driverPrefix: string;
    public client: any | null;
    public db: any | null;
    public baseUrl: string;

    constructor() {
        this.driverPrefix = 'fakeusers';
        this.client = "fake";
        this.db = "fake";
        this.baseUrl = "";
    }

    public async connect() {
        LogHelper.log('Faker User Driver usen, passing the connecting process.');
        this.initDb();
    }

    public initDb() {
        FakeUserModel.collection = this.getCollection(ServerController.usersTable);
        return ServerController.usersModel;
    }

    public getConnectionUrl() {
        if (this.baseUrl === '') {
            this.baseUrl = '';
        }
        return this.baseUrl;
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
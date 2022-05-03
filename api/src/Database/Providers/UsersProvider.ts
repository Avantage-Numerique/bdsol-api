import mongoose from "mongoose";
import config from "../../config";
import DbProvider, {BaseProvider} from "./DbProvider";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import User from "../../Users/Models/User";


export class UsersProvider extends BaseProvider implements DbProvider {

    private static _singleton:UsersProvider;

    constructor(name='') {
        super(name);
        this.urlPrefix = "mongodb";
    }

    public static getInstance():DbProvider|null {
        if (UsersProvider._singleton === undefined) {
            UsersProvider._singleton = new UsersProvider(config.users.db.name);
        }
        return UsersProvider._singleton;
    }

    public async connect():Promise<mongoose.Connection|null> {
        LogHelper.log("UserProvider Connecting to DB");
        await super.connect();

        User.connection = this.connection;

        return this.connection;
    }
}
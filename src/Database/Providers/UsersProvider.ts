import mongoose from "mongoose";
import config from "../../config";
import type {DbProvider} from "./DbProvider";
import {BaseProvider} from "./DbProvider";
import {User, UsersService} from "../../Users/UsersDomain";
import LogHelper from "../../Monitoring/Helpers/LogHelper";


export class UsersProvider extends BaseProvider implements DbProvider {

    private static _singleton:UsersProvider;

    constructor(name='')
    {
        super(name);
        this.urlPrefix = "mongodb";
    }


    public static getInstance():DbProvider|undefined
    {
        if (UsersProvider._singleton === undefined) {
            UsersProvider._singleton = new UsersProvider(config.users.db.name);
        }
        return UsersProvider._singleton;
    }


    public async connect():Promise<mongoose.Connection|undefined>
    {
        LogHelper.log("UserProvider Connecting to DB");
        await super.connect();

        User.connection = this.connection;
        this.service = UsersService.getInstance(User.getInstance());

        return this.connection;
    }
}
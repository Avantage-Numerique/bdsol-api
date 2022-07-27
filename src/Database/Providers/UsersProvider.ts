import mongoose from "mongoose";
import config from "../../config";
import type {DbProvider} from "./DbProvider";
import {BaseProvider} from "./DbProvider";
import {UsersService} from "../../Users/UsersDomain";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import AbstractModel from "../../Abstract/Model";


export class UsersProvider extends BaseProvider implements DbProvider
{

    private static _singleton:UsersProvider;

    _models:Array<AbstractModel>;

    constructor(name='')
    {
        super(name);
        this.urlPrefix = "mongodb";
    }


    /**
     * Singleton getter in the scope of the concrete provider.
     * @return {DbProvider}
     */
    public static getInstance():DbProvider|undefined
    {
        if (UsersProvider._singleton === undefined) {
            UsersProvider._singleton = new UsersProvider(config.users.db.name);
        }
        return UsersProvider._singleton;
    }


    /**
     * Connect this provider to mongoose.
     * @async
     * @return {mongoose.Connection}
     */
    public async connect():Promise<mongoose.Connection|undefined>
    {
        LogHelper.info("UserProvider Connecting to DB");
        await super.connect();

        return this.connection;
    }


    /**
     * Setup the mode with this provider properties: Connection, provider and setup this.service.
     * @param model
     */
    public assign(model:AbstractModel):void
    {
        this.addModel(model);
        model.connection = this.connection;
        model.provider = this;
        this.service = UsersService.getInstance(model);
    }
}
import mongoose from "mongoose";
import type {DbProvider} from "./DbProvider";
import {BaseProvider} from "./DbProvider";
import AbstractModel from "../../Abstract/Model";
import {Service} from "../Service";
import {DBDriver} from "../Drivers/DBDriver";
import LogHelper from "@src/Monitoring/Helpers/LogHelper";


export class UsersProvider extends BaseProvider implements DbProvider
{

    private static _singleton:UsersProvider;

    protected _services:Array<Service>;

    _models:Array<AbstractModel>;

    constructor( driver:DBDriver, name='users') {
        super(driver, name);
        this.urlPrefix = "mongodb";
        this._services = [];
    }


    /**
     * Singleton getter in the scope of the concrete provider.
     * @return {DbProvider}
     */
    public static getInstance(driver:DBDriver):DbProvider|undefined
    {
        if (UsersProvider._singleton === undefined) {
            UsersProvider._singleton = new UsersProvider(driver, 'bdsol-users');
        }
        return UsersProvider._singleton;
    }

    public static instance():DbProvider|undefined {
        if (UsersProvider._singleton !== undefined) {
            return UsersProvider._singleton;
        }
        return undefined;
    }


    /**
     * Connect this provider to mongoose.
     * @async
     * @return {mongoose.Connection}
     */
    public async connect():Promise<mongoose.Connection|boolean>
    {
        try {
            LogHelper.info("[BD] UserProvider Connecting to DB");
            const serverConnection:mongoose.Connection|boolean = await super.connect();
            if (serverConnection !== false) {
                return this.connection;
            }
        }
        catch (error:any) {
            LogHelper.error("[BD] Can't connect to db in UserProvider", error);
        }
        return false;
    }

    public async initServicesIndexes() {
        await super.initServicesIndexes();
    }

    public addService(service:Service) {
        super.addService(service);
    }

}
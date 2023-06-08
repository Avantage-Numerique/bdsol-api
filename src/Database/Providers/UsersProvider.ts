import mongoose from "mongoose";
import config from "../../config";
import type {DbProvider} from "./DbProvider";
import {BaseProvider} from "./DbProvider";
import AbstractModel from "../../Abstract/Model";
import {Service} from "../Service";
import {DBDriver} from "../Drivers/DBDriver";


export class UsersProvider extends BaseProvider implements DbProvider
{

    private static _singleton:UsersProvider;

    protected _services:Array<Service>;

    _models:Array<AbstractModel>;

    constructor( driver:DBDriver, name='')
    {
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
            UsersProvider._singleton = new UsersProvider(driver, config.users.db.name);
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
        await super.connect();

        return this.connection;
    }

    public async initServicesIndexes() {
        await super.initServicesIndexes();
    }

    public addService(service:Service) {
        super.addService(service);
    }

}
import mongoose from "mongoose";
import config from "../../config";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import type {DbProvider} from "./DbProvider";
import {BaseProvider} from "./DbProvider";
import AbstractModel from "../../Abstract/Model";
import type {Service} from "../Service";
import {DBDriver} from "../Drivers/DBDriver";

/**
 *  The Data provider allow entities to interact with the DB via the MongooseDriver.
 */
export class DataProvider extends BaseProvider implements DbProvider
{
    private static _singleton:DataProvider;

    protected _services:Array<Service> = [];

    _models:Array<AbstractModel>;

    /**
     * contructor
     * @param driver {DBDriver} The driver in which this provider will evoluate. It provide mainly the connection url.
     * @param name
     */
    constructor(driver:DBDriver, name='data') {
        super(driver, name);
        this.urlPrefix = "mongodb";
    }

    /**
     * Singleton getter in the scope of the concrete provider.
     * @return {DbProvider}
     */
    public static getInstance(driver:DBDriver):DbProvider
    {
        if (DataProvider._singleton === undefined) {
            DataProvider._singleton = new DataProvider(driver, config.db.name);
        }
        return DataProvider._singleton;
    }

    /**
     * @async
     * Connect the provider to mongo via mongoose.Connection.
     * @return {mongoose.Connection}
     */
    public async connect():Promise<mongoose.Connection|undefined> {
        try {
            LogHelper.info("[BD] DataProvider Connecting to DB");
            await super.connect();

            return this.connection;
        }
        catch (error:any) {
            LogHelper.error("[BD] Can't connect to db in DataProvider");
        }
        return undefined;
    }


    /**
     * Assign a model to this provider.
     * @param model
     * @param service {Service}
     */
    /*public assign(service:Service) {
        // we may can delete the model's provider property because everything is already handler within the model's connecion set here.
        this.addService(service);
        service.model.connection = this.connection;
        service.model.provider = this;
    }*/

}
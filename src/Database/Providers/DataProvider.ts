import mongoose from "mongoose";
import config from "../../config";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import type {DbProvider} from "./DbProvider";
import {BaseProvider} from "./DbProvider";
import AbstractModel from "../../Abstract/Model";

/**
 *  The Data provider allow entities to interact with the DB via the MongooseDriver.
 */
export class DataProvider extends BaseProvider implements DbProvider
{
    private static _singleton:DataProvider;
    _models:Array<AbstractModel>;

    /**
     * contructor
     * @param name
     */
    constructor(name='data') {
        super(name);
        this.urlPrefix = "mongodb";
    }

    /**
     * Singleton getter in the scope of the concrete provider.
     * @return {DbProvider}
     */
    public static getInstance():DbProvider {
        if (DataProvider._singleton === undefined) {
            DataProvider._singleton = new DataProvider(config.db.name);
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
            LogHelper.log("[BD] DataProvider Connecting to DB");
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
     */
    public assign(model:AbstractModel) {
        this.addModel(model);
        model.connection = this.connection;
        model.provider = this;
        return model;
    }

}
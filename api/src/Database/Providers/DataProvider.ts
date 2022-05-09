import mongoose from "mongoose";
import config from "../../config";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import type {DbProvider} from "./DbProvider";
import {BaseProvider} from "./DbProvider";
import Personne from "../../Personnes/Models/Personne";


export class DataProvider extends BaseProvider implements DbProvider {

    private static _singleton:DataProvider;

    constructor(name='data') {
        super(name);
        this.urlPrefix = "mongodb";
    }

    public static getInstance():DbProvider {
        if (DataProvider._singleton === undefined) {
            DataProvider._singleton = new DataProvider(config.db.name);
        }
        return DataProvider._singleton;
    }


    public async connect():Promise<mongoose.Connection|undefined> {
        try {
            LogHelper.log("DataProvider Connecting to DB");
            await super.connect();

            Personne.connection = this.connection;

            return this.connection;
        }
        catch (error:any) {
            LogHelper.error("Can't connect to db in DataProvider");
        }
        return undefined;
    }

}
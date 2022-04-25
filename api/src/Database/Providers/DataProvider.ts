import Provider, {BaseProvider} from "./Provider";
import config from "../../config";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import mongoose from "mongoose";
import Personne from "../../Personnes/Models/Personne";


export class DataProvider extends BaseProvider implements Provider {

    private static _singleton:DataProvider;

    constructor(name='data') {
        super(name);
        this.urlPrefix = "mongodb";
    }

    public static getInstance():DataProvider {
        if (DataProvider._singleton === undefined) {
            DataProvider._singleton = new DataProvider(config.db.name);
        }
        return DataProvider._singleton;
    }


    public async connect():Promise<mongoose.Connection|null> {
        try {
            LogHelper.log("DataProvider Connecting to DB");
            await super.connect();

            Personne.connection = this.connection;

            return this.connection;
        }
        catch (error:any) {
            LogHelper.error("Can't connect to db in DataProvider");
        }
        return null;
    }

}
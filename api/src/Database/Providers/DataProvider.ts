import Provider, {BaseProvider} from "./Provider";
import config from "../../config";
import LogHelper from "../../Monitoring/Helpers/LogHelper";


export class DataProvider extends BaseProvider implements Provider {

    private static _singleton:DataProvider;

    constructor(name='data') {
        super(name);
        this.urlPrefix = "mongodb";
        LogHelper.log("Data Provider instanciated");
    }

    public static getInstance():DataProvider {
        if (DataProvider._singleton === undefined) {
            DataProvider._singleton = new DataProvider(config.db.name);
        }
        return DataProvider._singleton;
    }

}
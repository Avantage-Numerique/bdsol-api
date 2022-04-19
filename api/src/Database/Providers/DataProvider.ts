import Provider, {BaseProvider} from "./Provider";
import config from "../../config";


export class DataProvider extends BaseProvider implements Provider {

    private _singleton:DataProvider;

    constructor(name='data') {
        super(name);
        this.urlPrefix = "mongodb";
    }

    public getInstance():DataProvider {
        if (this._singleton === null) {
            this._singleton = new DataProvider(config.db.name);
        }
        return this._singleton;
    }

}
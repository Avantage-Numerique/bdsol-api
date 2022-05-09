import LogHelper from "../../Monitoring/Helpers/LogHelper";
//import {UsersProvider} from "../../Database/DatabaseDomain";
import {User} from "../UsersDomain";
import {Service} from "../../Database/DatabaseDomain";
import {ApiResponseContract} from "../../Http/Responses/ApiResponse";

export class UsersService extends Service {

    private static _instance:UsersService;

    //this should received the connection.
    constructor(model:any=null) {
        if (model === null) {
            model = User.getInstance();
            LogHelper.debug("UsersService ", model);
        }
        super(model);
        LogHelper.debug("After model UsersService ", this.model);
    }

    public static getInstance(model:any):UsersService
    {
        if (UsersService._instance === undefined) {
            UsersService._instance = new UsersService(model);
        }
        return UsersService._instance;
    }

    async get(query: any): Promise<ApiResponseContract>
    {
        return await super.get(query);
    }

    /**
     * @deprecated
     */
    /*public static getInstanceOLD() {
        User.provider = UsersProvider.getInstance();//must have
        if (User.providerIsSetup()) {
            User.initSchema();

            return User.provider.connection.model(User.modelName);
        }
        throw new Error("Personne Provider is not setup. Can't get Personne's model");
    }*/
}
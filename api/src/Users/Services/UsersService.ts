import {User} from "../UsersDomain";
import Service from "../../Database/Service";
import {UsersProvider} from "../../Database/Providers/UsersProvider";
import LogHelper from "../../Monitoring/Helpers/LogHelper";

export class UsersService extends Service {

    private static _instance:UsersService;

    //this should received the connection.
    constructor(model:any=null) {
        /*if (model === null) {
            model = User.getInstance();
            LogHelper.debug("UsersService ", model);
        }*/

        //model = User.getInstance();
        LogHelper.debug("After model UsersService ", model);
        super(model);
    }

    public static getInstance(model:any):UsersService
    {
        /*if (UsersService._instance === undefined) {
            UsersService._instance = new UsersService();
            LogHelper.debug("Get UsersService Instance ", UsersService._instance);
        }*/
        //UsersService._instance = new UsersService(model);

        LogHelper.debug("Get UsersService Instance after ", UsersService._instance);
        return new UsersService(model);//UsersService._instance;
    }

    /**
     * @deprecated
     */
    public static getInstanceOLD() {
        User.provider = UsersProvider.getInstance();//must have
        if (User.providerIsSetup()) {
            User.initSchema();
            // @ts-ignore //provider could be null
            return User.provider.connection.model(User.modelName);
        }
        throw new Error("Personne Provider is not setup. Can't get Personne's model");
    }
}

import Service from "../../Database/Service";
import User from "../Models/User";
import {UsersProvider} from "../../Database/Providers/UsersProvider";

class UsersService extends Service {

    //this should received the connection.
    constructor(model:any=null) {
        if (model === null) {
            User.getInstance();
        }
        super(model);
    }

    static getInstance() {
        User.provider = UsersProvider.getInstance();//must have
        if (User.providerIsSetup()) {
            User.initSchema();
            // @ts-ignore
            return User.provider.connection.model(User.modelName);
        }
        throw new Error("Personne Provider is not setup. Can't get Personne's model");
    }
}

export default UsersService;
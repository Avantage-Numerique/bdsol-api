
import Service from "../../Database/Service";
import User from "../Models/User";

class UsersService extends Service {
    //this should received the connection.
    constructor(model:any=null) {
        if (model === null) {
            User.getInstance();
        }
        super(model);
    }
}

export default UsersService;
import mongoose from "mongoose";
import {User} from "../Models/User";
import {UsersService} from "../Services/UsersService";
import AbstractController from "../../Abstract/Controller";
import UsersHistoryService from "../../UserHistory/Services/UsersHistoryService";
import UserHistory from "../../UserHistory/Models/UserHistory";
import { UserHistorySchema } from "../../UserHistory/Schemas/UserHistorySchema";

class UsersController extends AbstractController {

    /** @private @static Singleton instance */
    private static _instance:AbstractController;

    /** @public OrganisationService */
    service:UsersService;

    /** @public Model */
    entity:User;

    constructor() {
        super();
        this.entity = User.getInstance();
        this.service = UsersService.getInstance(this.entity);
    }

    /**
     * @public @static @method getInstance Create the singleton instance if not existing 
     * @return {UsersController} Controller singleton constructor
    */
    public static getInstance():AbstractController {
        if (UsersController._instance === undefined) {
            UsersController._instance = new UsersController();
        }
        return UsersController._instance;
    }

    public async createUserHistory(req:any, res:any):Promise<boolean> {
        const response = res.serviceResponse;
        const action = res.action ?? "create";
        const userHistoryService:UsersHistoryService = UsersHistoryService.getInstance(UserHistory.getInstance());
        //User id
        const user:mongoose.ObjectId = response.data._id

        //IP Address
        const ipAddress = req.ip;

        //Modification date
        const modifDate = new Date();

        //Modified entity id
        //const modifiedEntity = response.data._id;

        //Action on the data
        //action <---

        //Set modified fields
        const fields = response.data;
        
        const history: UserHistorySchema = {
            "user": user,
            "ipAddress": ipAddress,
            "modifDate": modifDate,
            "action": action,
            "entityCollection": "users",
            "modifiedEntity": user,
            "fields": this.entity.dataTransfertObject(fields),
        } as UserHistorySchema;

        //Service call to add UserHistory
        await userHistoryService.insert(history);
        return true;
    }
}
export {UsersController};
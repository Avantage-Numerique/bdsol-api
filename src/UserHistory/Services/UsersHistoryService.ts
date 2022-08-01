import {Service} from "../../Database/DatabaseDomain";
import UserHistory from "../Models/UserHistory";

class UsersHistoryService extends Service
{
    /** @private @static Singleton instance */
    private static _instance:UsersHistoryService;

    constructor(entity:UserHistory) {
        super(entity);
    }

    /** @public @static Singleton constructor for UsersHistoryService */
    public static getInstance(model:any):UsersHistoryService {
        if (UsersHistoryService._instance === undefined) {
            UsersHistoryService._instance = new UsersHistoryService(model);
        }
        return UsersHistoryService._instance;
    }
}
export default UsersHistoryService;
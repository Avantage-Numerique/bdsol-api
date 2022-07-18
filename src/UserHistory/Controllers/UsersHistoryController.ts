import UserHistory from "../Models/UserHistory";
import UsersHistoryService from "../Services/UsersHistoryService";
import AbstractController from "../../Abstract/Controller";

class UsersHistoryController extends AbstractController {

    /** @private @static Singleton instance */
    private static _instance:AbstractController;

    /** @public UsersHistoryService */
    service:UsersHistoryService;

    /** @public Model */
    entity:UserHistory;

    constructor() {
        super();
        this.entity = UserHistory.getInstance();
        this.service = new UsersHistoryService(this.entity);
    }

    /**
     * @public @static @method getInstance Create the singleton instance if not existing 
     * @return {UsersHistoryController} Controller singleton constructor
    */
    public static getInstance():AbstractController {
        if (UsersHistoryController._instance === undefined) {
            UsersHistoryController._instance = new UsersHistoryController();
        }
        return UsersHistoryController._instance;
    }
}
export {UsersHistoryController};
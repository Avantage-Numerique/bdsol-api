import UserHistory from "../Models/UserHistory";
import UsersHistoryService from "../Services/UsersHistoryService";
import AbstractController from "../../Abstract/Controller";
import { ApiResponseContract } from "src/Http/Responses/ApiResponse";

class UsersHistoryController extends AbstractController {

    /** @private @static Singleton instance */
    private static _instance:AbstractController;

    /** @public UsersHistoryService */
    service:UsersHistoryService;

    /** @public Model */
    entity:UserHistory;

    name:string = "UserHistory";

    constructor() {
        super();
        this.entity = UserHistory.getInstance();
        this.service = UsersHistoryService.getInstance(this.entity);
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

    /**
     * @method list List entity documents with research terms from database
     * @param {any} requestData - Research terms { "nom":"Jean" }
     * @return {ApiResponseContract} Promise containing a list of documents
     */
     public async list(requestData: any): Promise<ApiResponseContract> {
        //const query = QueryBuilder.build(requestData);
        const sort = { "createdAt": -1 };
        return await this.service.all(requestData, sort);
    }
}
export {UsersHistoryController};
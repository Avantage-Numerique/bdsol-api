import UserHistory from "../Models/UserHistory";
import UsersHistoryService from "../Services/UsersHistoryService";
import AbstractController from "../../Abstract/Controller";
import {ApiResponseContract} from "../../Http/Responses/ApiResponse"
import QueryBuilder from "@database/QueryBuilder/QueryBuilder";
import ApiQuery from "@database/QueryBuilder/ApiQuery";

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
        console.log("users history controller list", requestData);
        const query:ApiQuery = QueryBuilder.build(requestData, true);
        /*query.options = {
            sort: { "createdAt": -1 }
        }*/
        return await this.service.all(query);
    }
}
export {UsersHistoryController};
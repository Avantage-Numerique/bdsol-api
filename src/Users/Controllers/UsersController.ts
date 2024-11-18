import {User} from "../Models/User";
import {UsersService} from "../Services/UsersService";
import AbstractController from "../../Abstract/Controller";
import UsersHistoryService from "../../UserHistory/Services/UsersHistoryService";
import UserHistory from "../../UserHistory/Models/UserHistory";
import {UserHistorySchema} from "@src/UserHistory/Schemas/UserHistorySchema";
import {ApiResponseContract} from "@src/Http/Responses/ApiResponse";
import {ErrorResponse} from "@src/Http/Responses/ErrorResponse";
import {StatusCodes} from "http-status-codes";

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


    public async createUserHistory(req: any, res: any): Promise<ApiResponseContract> {
        const userHistoryService: UsersHistoryService = UsersHistoryService.getInstance(UserHistory.getInstance());
        const response:any = res.serviceResponse;
        const action:string = res.serviceResponse.action;
        try {
            //User id
            const user: any = req.user?._id;


            //IP Address
            const ipAddress = req.visitor.ip;
            const fromAppIp = req.ip;

            //Modification date
            const modifDate = new Date();

            //Affected database
            const entityCollection = req.originalUrl.split("/")[1]; //split every '/' --> [ "" / "organisations" / "create" ]

            //Modified entity id
            const modifiedEntity = response.data?._id;

            //Action on the data
            //action <---

            //Set modified fields
            const fields = response.data;

            //Media
            const media = response.media ?? {}

            const history: UserHistorySchema = {
                "user": user,
                "ipAddress": ipAddress,
                "modifDate": modifDate,
                "action": action,
                "entityCollection": entityCollection,
                "modifiedEntity": modifiedEntity,
                "fields": this.entity.dataTransfertObject(fields),
            } as UserHistorySchema;

            //Service call to add UserHistory
            return await userHistoryService.insert(history);
        }
        catch(e:any)
        {
            return ErrorResponse.create(
                e,
                StatusCodes.INTERNAL_SERVER_ERROR,
                "Can't create the user history due to an error.");
        }
    }
}
export {UsersController};
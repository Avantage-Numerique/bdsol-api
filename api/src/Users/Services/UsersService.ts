import {User} from "../UsersDomain";
import {Service} from "../../Database/DatabaseDomain";
import {ApiResponseContract} from "../../Http/Responses/ApiResponse";

export class UsersService extends Service {

    private static _instance:UsersService;

    //this should received the connection.
    constructor(model:any=null) {
        if (model === null) {
            model = User.getInstance();
        }
        super(model);
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
}
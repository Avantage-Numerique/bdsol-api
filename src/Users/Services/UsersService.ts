import {Service} from "@database/DatabaseDomain";
import {ApiResponseContract} from "@src/Http/Responses/ApiResponse";

export class UsersService extends Service {

    /** @private @static Singleton instance */
    private static _instance:UsersService;

    constructor(model:any=null) {
        super(model);
    }

    /** @public @static Singleton constructor for UsersService */
    public static getInstance(model:any):UsersService {
        if (UsersService._instance === undefined) {
            UsersService._instance = new UsersService(model);
        }
        return UsersService._instance;
    }

    async get(query: any): Promise<ApiResponseContract> {
        return await super.get(query);
    }

    async getUserByUsername(username:string): Promise<any>
    {
        return await this.get({username: username});
    }
}
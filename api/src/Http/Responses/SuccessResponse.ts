import ApiResponse, {ApiResponseContract} from "./ApiResponse";

export class SuccessResponse extends ApiResponse {

    constructor(response:ApiResponseContract) {
        super(response);
        this.error = false;
    }

    public static create(data:object, code:number, message:string, user:any={}):ApiResponseContract {

        const success = new SuccessResponse({
            error:false,
            code: code,
            message: message,
            errors: [],
            user: user,
            data: data
        } as ApiResponseContract);
        return success.response;
    }

}
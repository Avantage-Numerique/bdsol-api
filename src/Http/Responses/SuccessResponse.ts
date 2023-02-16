import ApiResponse, {ApiResponseContract} from "./ApiResponse";

export class SuccessResponse extends ApiResponse {

    constructor(response:ApiResponseContract) {
        super(response);
        this.error = false;
    }

    public static create(data:any, code:number, message:string):ApiResponseContract {

        const success = new SuccessResponse({
            error:false,
            code: code,
            message: message,
            errors: {},
            data: data
        } as ApiResponseContract);
        return success.response;
    }

}
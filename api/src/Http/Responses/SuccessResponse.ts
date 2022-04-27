import ApiResponse, {ApiResponseContract} from "./ApiResponse";

export class SuccessResponse extends ApiResponse {

    constructor(response:ApiResponseContract) {
        super(response);
        this.error = true;
    }

    public static create(data:object, code:number, message:string):ApiResponseContract {
        return new SuccessResponse({
            error:false,
            code: code,
            message: message,
            errors: [],
            data: data
        } as ApiResponseContract);
    }

}
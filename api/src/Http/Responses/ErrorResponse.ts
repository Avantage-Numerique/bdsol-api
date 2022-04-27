import ApiResponse, {ApiResponseContract} from "./ApiResponse";

export class ErrorResponse extends ApiResponse {

    constructor(response:ApiResponseContract) {
        super(response);
        this.error = true;
    }

    public static create(errorsObj:any, code:number, message:string="Erreur", data:object={}):ApiResponseContract {
        return new ErrorResponse({
            error:true,
            code: code,
            message: errorsObj.errmsg || message,
            errors: errorsObj.errors,
            data: data
        } as ApiResponseContract);
    }
}
import ApiResponse from "../../Http/Responses/ApiResponse";
import type {ApiResponseContract} from "../../Http/Responses/ApiResponse";

export class AuthResponse extends ApiResponse {

    constructor(response:ApiResponseContract) {
        super(response);
        this.error = true;
    }

    /**
     * Create an error directly from the Error object
     * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
     * @param token {string} Error The JS object from the browser. This is a surface implementation due to browser support.
     * @param code number http error code
     * @param message string the error message
     * @param data the data almost always empty
     */
    public static create(token:string, code:number, message:string="Erreur", data:object={}):ApiResponseContract {
        const error = new AuthResponse({
            error:false,
            code: code,
            userConnectedToken: token,
            message: message,
            errors: [],
            data: data
        } as ApiResponseContract);
        return error.response;
    }
}
import ApiResponse, {ApiResponseContract} from "./ApiResponse";

export class ErrorResponse extends ApiResponse
{

    constructor(response:ApiResponseContract)
    {
        super(response);
        this.error = true;
    }

    /**
     * Create an error directly from the Error object
     * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
     * @param errorsObj Error The JS object from the browser. This is a surface implementation due to browser support.
     * @param code number http error code
     * @param message string the error message
     * @param data the data almost always empty
     */
    public static create(errorsObj:Error, code:number, message:string="Erreur", data:object={}):ApiResponseContract
    {
        let singleError;
        if (errorsObj !== undefined &&
            errorsObj.name !== undefined)
        {
            singleError = [
                {
                    name: errorsObj.name,
                    message: errorsObj.message
                }
            ];
        }
        else
        {
            singleError = ErrorResponse.getDefaultError();
        }

        return ErrorResponse.createWithMultipleErrors(singleError, code, message, data);
    }


    /**
     * Allow to push multiple error in the same response.
     * @param errors {array} pushes array of errors.
     * @param code number http error code
     * @param message string the error message
     * @param data the data almost always empty
     */
    public static createWithMultipleErrors(errors:any, code:number, message:string="Erreur", data:object={}):ApiResponseContract
    {
        const error = new ErrorResponse({
            error:true,
            code: code,
            message: message,
            errors: errors,
            data: data
        } as ApiResponseContract);
        return error.response;
    }

    public static getDefaultError():Error {
        return new Error("Error HTTP par défault. Something went wrong.");
    }
}
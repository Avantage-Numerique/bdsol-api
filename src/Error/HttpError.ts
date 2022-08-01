import {ApiResponseContract} from "../Http/Responses/ApiResponse";
import LogHelper from "../Monitoring/Helpers/LogHelper";
import {StatusCodes, ReasonPhrases} from "http-status-codes";
import {ErrorResponse} from "../Http/Responses/ErrorResponse";

export default class HttpError extends Error {

    public name:any;
    public status:any;
    public message:string;
    public stack:any;
    public response:any;

    constructor(message:string = "Erreur") {
        super(message);
    }

    /**
     * @static @method NotAcceptable log erreur $message et retourne une réponse d'erreur
     * Paramètres :
     * @param {string} message - erreur à mettre dans les logs @default ""
     * @param {boolean} log - Si on log l'erreur @default true
     * @returns {ApiResponseContract}
     */
    static NotAcceptable(message: string = "", log=true): ApiResponseContract
    {
        if (log) {
            LogHelper.error(ReasonPhrases.NOT_ACCEPTABLE, message);
        }

        return ErrorResponse.create(
            new Error(ReasonPhrases.NOT_ACCEPTABLE),
            StatusCodes.NOT_ACCEPTABLE,
            message
        );
    }


    /**
     * @static @method NotImplemented log erreur $message et retourne une réponse d'erreur (ServiceResponse).
     *
     * Paramètres :
     *      @param {string} message - erreur à mettre dans les logs @default ""
     *
     * Retourne :
     *      @returns {ServiceResponse}
     */
    static NotImplemented(message: string = ""): ApiResponseContract
    {
        LogHelper.error(ReasonPhrases.NOT_IMPLEMENTED, StatusCodes.NOT_IMPLEMENTED, message);
        return ErrorResponse.create(
            new Error(ReasonPhrases.NOT_IMPLEMENTED),
            StatusCodes.NOT_IMPLEMENTED,
            message
        );
    }


    static Unauthorized (message: string = "")
    {
        const msg:string = message !== "" ? message : "Ce chemin d'accès nécessiste un token pour être utilisé.";

        LogHelper.error(ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED, msg);

        const unauthorizedError:HttpError = new HttpError(msg);
        unauthorizedError.name = "UNAUTHORIZED";
        unauthorizedError.status = StatusCodes.UNAUTHORIZED;

        //error.stack = ;//need to get the stack.
        /*const unauthorizedRequestError = ErrorResponse.create(
            error,
            StatusCodes.UNAUTHORIZED,
            ReasonPhrases.UNAUTHORIZED,
            {}
        );*/

        return unauthorizedError;
        //return unauthorizedRequestError;
    }

}
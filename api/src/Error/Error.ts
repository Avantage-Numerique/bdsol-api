
import ServiceResponse from "../Database/Responses/ServiceResponse";
import LogHelper from "../Monitoring/Helpers/LogHelper";
import {StatusCodes} from "http-status-codes";

export class Error {

    //public statusCode;
    public response;

    constructor(response:object) {
        if (typeof response === 'object') {
            this.response = response;
        }
    }

    /** 
     * @static @method NotAcceptable log erreur $message et retourne une réponse d'erreur (ServiceResponse).
     * @todo Est-ce au bon endroit ? (Error ou httpError?...)
     * Paramètres :
     *      @param {string} $message - erreur à mettre dans les logs @default ""
     * 
     * Retourne :
     *      @returns {ServiceResponse}
     */
    static NotAcceptable($message:string=""):ServiceResponse {
        LogHelper.error("Échec NotAcceptable ", $message);
        return {
            error: true,
            code: StatusCodes.NOT_ACCEPTABLE,
            message: $message,
            errors: [],
            data: {}
        } as ServiceResponse;
    }


    /** 
     * @static @method NotImplemented log erreur $message et retourne une réponse d'erreur (ServiceResponse).
     * 
     * Paramètres :
     *      @param {string} $message - erreur à mettre dans les logs @default ""
     * 
     * Retourne :
     *      @returns {ServiceResponse}
     */
         static NotImplemented($message:string=""):ServiceResponse {
            LogHelper.error("Échec Not_Implemented ", $message);
            return {
                error: true,
                code: StatusCodes.NOT_IMPLEMENTED,
                message: $message,
                errors: [],
                data: {}
            } as ServiceResponse;
        }

}

/**
 * Erreur dansService : Delete.
 * JS errors : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
 */
/*
error: false,
code: StatusCodes.ACCEPTED,
deleted: true,//abstrack that ? like : ActionSucceed : true false ?
message: "Item will be deleted",
data: {
    item
}
 */
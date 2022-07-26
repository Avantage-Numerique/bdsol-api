import LogHelper from "../../Monitoring/Helpers/LogHelper";
import {NextFunction, Request, Response} from "express";
import HttpError from "../HttpError";
import {ErrorResponse} from "../../Http/Responses/ErrorResponse";

export class ApiErrorHandler {

    /**
     * Getter for the anonumous function that will act as the middleware, with the parameters and the next() call.
     */
    public static middlewareFunction()
    {
        /**
         * The VerifyTokenMIddleware anonymous function.
         * @param err {Error}
         * @param req {Request}
         * @param res {Response}
         * @param next {NextFunction}
         * @return Promise<Response<any, Record<string, any>> | undefined>
         */
        return async function (err: Error, req: Request, res: Response, next: NextFunction)
        {
            const httpError:HttpError = err as HttpError;
            LogHelper.error("ApiErrorHandler", httpError.message);
            return res.status(httpError.status || 500)
                .json(ErrorResponse.create(
                        httpError,
                        httpError.status,
                        httpError.message
                    )
                ).end();
        }
    }
}

import {NextFunction, Response} from "express";
import AuthRequest from "../Types/AuthRequest";

/**
 * Express JS middleware for verifying the token.
 */
export class AddUserToRequest {

    /**
     * This rith in a method return an error in typescript return an error. The types are not good.
     */

    /**
     * Getter for the anonumous function that will act as the middleware, with the parameters and the next() call.
     */
    public static middlewareFunction()
    {
        /**
         * The AddUserToRequest anonymous function.
         * @param req {AuthRequest}
         * @param res {Response}
         * @param next {NextFunction}
         * @return Promise<Response<any, Record<string, any>> | undefined>
         */
        return async function (req: AuthRequest, res: Response, next: NextFunction) {
            next();
        }
    }

}
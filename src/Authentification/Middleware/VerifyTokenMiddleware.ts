import {NextFunction, Response, Request} from "express";
import {TokenController} from "../Controllers/TokenController";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import HttpError from "../../Error/HttpError";

export class VerifyTokenMiddleware {

    /**
     * Getter for the anonumous function that will act as the middleware, with the parameters and the next() call.
     */
    public static middlewareFunction()
    {
        /**
         * The VerifyTokenMIddleware anonymous function.
         * @param req {Request}
         * @param res {Response}
         * @param next {NextFunction}
         * @return Promise<Response<any, Record<string, any>> | undefined>
         */
        return async function (req: Request, res: Response, next: NextFunction)
        {
            LogHelper.info(`Verifying the token sent for ${req.originalUrl}`);

            // Get token from header
            //const headers = req.headers;
            if (req.headers &&
                req.headers.authorization)
            {
                const authentificationHeader = req.headers.authorization;

                const token = authentificationHeader.split(' ');
                const userToken = token[1];

                //LogHelper.info("A Token is sent via the header authorization.");

                // Check if no token
                if (!userToken) {
                    next(HttpError.Unauthorized("Token is missing the authentification header. We can't verify the user."));
                    return;
                }

                try
                {
                    const verifiedToken:any = await TokenController.verify(userToken);

                    if (verifiedToken.validated === true) {
                        // Set the user in the request, for the last middlewares and endpoints.
                        req.user.ip = req.socket.remoteAddress;//when reverse proxy : req.headers['x-forwarded-for'] ||
                        req.user = verifiedToken;
                        LogHelper.info(`User's token verified, next to url ${req.originalUrl}`);
                        // Here is the only reason why we allow the request to do the next() function.
                        next();
                        return;//prevent the head from going into the end of the function.
                    }
                }
                catch (err)
                {
                    next(HttpError.Unauthorized("Token verification error catched."));
                    return;
                }
            }

            next(HttpError.Unauthorized("Token verification failed."));
            return;
        }
    }

}
import {NextFunction, Response} from "express";
import AuthRequest from "../Types/AuthRequest";
import {TokenController} from "../Controllers/TokenController";
import {StatusCodes, ReasonPhrases} from "http-status-codes";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import {ErrorResponse} from "../../Http/Responses/ErrorResponse";

export class VerifyTokenMiddleware {

    /**
     * Getter for the anonumous function that will act as the middleware, with the parameters and the next() call.
     */
    public static middlewareFunction()
    {
        /**
         * The VerifyTokenMIddleware anonymous function.
         * @param req {AuthRequest}
         * @param res {Response}
         * @param next {NextFunction}
         * @return Promise<Response<any, Record<string, any>> | undefined>
         */
        return async function (req: AuthRequest, res: Response, next: NextFunction):Promise<Response<any, Record<string, any>> | undefined> {
            // Get token from header
            const headers = req.headers;

            if (headers &&
                headers.authorization)
            {
                const authentificationHeader = headers.authorization;

                const token = authentificationHeader.split(' ');
                const userToken = token[1];

                // Check if no token
                if (!userToken) {
                    LogHelper.error("Token is missing the authentification header. We can't verify the user.");
                    return VerifyTokenMiddleware.unauthorizedResponse(res);
                }

                try {
                    const isTokenVerify:any = await TokenController.verify(userToken);
                    LogHelper.log("Verifying the token sent for the current request.");
                    if (isTokenVerify.name === undefined ) {
                        next();
                    }
                }
                catch (err)
                {
                    LogHelper.error("Token verification failed.");
                    VerifyTokenMiddleware.unauthorizedResponse(res);
                }
            }
        }
    }

    /**
     * Centralized response for when the call isn't authorized.
     * @param res
     * @protected
     */
    protected static unauthorizedResponse(res:Response):Response
    {
        LogHelper.info("Unauthorized request");
        const unauthorizedRequestError = ErrorResponse.create(
            new Error("Ce chemin d'accès nécessiste un token pour être utilisé."),
            StatusCodes.UNAUTHORIZED,
            ReasonPhrases.UNAUTHORIZED,
            {}
        );
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json(unauthorizedRequestError)
            .end();
    }
}
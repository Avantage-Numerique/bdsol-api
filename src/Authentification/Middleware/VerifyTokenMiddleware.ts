import {NextFunction, Response} from "express";
import AuthRequest from "../Types/AuthRequest";
import AuthResponse from "../Types/AuthResponse";
import {TokenController} from "../Controllers/TokenController";
import {StatusCodes, ReasonPhrases} from "http-status-codes";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import {ErrorResponse} from "../../Http/Responses/ErrorResponse";

export class VerifyTokenMiddleware
{

    /**
     * Express middle function to verify the token on every request on targets Routers.
     * Used in /src/api.ts
     */
    public static middlewareFunction()
    {
        return async function (req: AuthRequest, res: AuthResponse, next: NextFunction):Promise<Response<any, Record<string, any>> | undefined> {
            // Get token from header
            const headers = req.headers;

            if (headers &&
                headers.authorization)
            {
                const authentificationHeader = headers.authorization;

                const token = authentificationHeader.split(' ');
                const userToken = token[1];

                // Check if no token
                if (!userToken)
                {
                    LogHelper.error("Token is missing the authentification header. We can't verify the user.");
                    return VerifyTokenMiddleware.unauthorizedResponseAndStopRequest(res);
                }

                try
                {
                    req.user = TokenController.verify(userToken);
                    LogHelper.log("Verifying the token sent for the current request.");
                    next();
                }
                catch (err)
                {
                    LogHelper.error("Token verification failed.");
                    return VerifyTokenMiddleware.unauthorizedResponseAndStopRequest(res);
                }
            }
        }
    }


    /**
     * Express middleware to add the user to the target request and response.
     * used in /src/api.ts
     */
    public static addUserToResponse() {
        return async function (req: AuthRequest, res: AuthResponse, next: NextFunction):Promise<Response<any, Record<string, any>> | undefined> {
            if (req.user) {
                res.user = req.user;
            }
            next();
            return;
        }
    }


    /**
     * Centralized error when the verify
     * @param res
     * @protected
     */
    protected static unauthorizedResponseAndStopRequest(res:AuthResponse):any
    {
        LogHelper.info("Unauthorized request");
        const unauthorizedRequestError = ErrorResponse.create(
            new Error("Route need authorization to be access"),
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
import {NextFunction, Response} from "express";
import AuthRequest from "../Types/AuthRequest";
import {TokenController} from "../Controllers/TokenController";
import {StatusCodes, ReasonPhrases} from "http-status-codes";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import {ErrorResponse} from "../../Http/Responses/ErrorResponse";

export class VerifyTokenMiddleware {

    public static middlewareFunction()
    {
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
                    LogHelper.log("Verifying the token sent for the current request.", isTokenVerify);
                    if (isTokenVerify.name === undefined) {
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
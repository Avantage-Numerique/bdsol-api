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
                LogHelper.debug("token", token, userToken);

                // Check if no token
                if (!userToken) {
                    return VerifyTokenMiddleware.unauthorizedResponse(res);
                }

                try {
                    req.user = TokenController.verify(userToken);
                    LogHelper.debug("req.user", req.user);
                    next();
                }
                catch (err)
                {
                    VerifyTokenMiddleware.unauthorizedResponse(res);
                }
            }
        }
    }

    protected static updateTokenLife(verifiedToken:any):any
    {
        if (verifiedToken)
        {
            //const now = date();
            //if augment lifespan
            //add params with last updated
            //add params with the count of request
            //
            return verifiedToken;
        }
    }

    protected static verifyLifeSpan(verifiedToken:any):any
    {
        if (verifiedToken)
        {
            //const now = date();
            //if now - verifiedToken.emission <= lifespan
            //token actif
            //sinon
            //token invalide
            //invalidetoken
            return verifiedToken;
        }
    }


    protected static unauthorizedResponse(res:Response):Response
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
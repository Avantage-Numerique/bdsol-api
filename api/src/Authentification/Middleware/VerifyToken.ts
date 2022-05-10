import {NextFunction, Response} from "express";
import AuthRequest from "../Types/AuthRequest";
import {TokenController} from "../Controllers/TokenController";
import {StatusCodes, ReasonPhrases} from "http-status-codes";

class VerifyToken {

    public inHeader(req: AuthRequest, res: Response, next: NextFunction) {
        // Get token from header
        const authHeader = req.headers.authorization;

        if (authHeader)
        {
            const token = authHeader.split(' ')[1];

            // Check if no token
            if (!token) {
                return this.unauthorizedResponse(res);
            }

            try {
                req.user = TokenController.verify(token);
                next();
            }
            catch (err)
            {
                this.unauthorizedResponse(res);
            }
        }
        this.unauthorizedResponse(res);
    }

    protected unauthorizedResponse(res:Response):Response {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            "message": ReasonPhrases.UNAUTHORIZED
        });
    }
}


export default VerifyToken
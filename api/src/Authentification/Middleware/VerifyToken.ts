import {NextFunction, Response} from "express";
import Payload from "../Types/Payload";
import AuthRequest from "../Types/AuthRequest";
import {TokenController} from "../Controllers/TokenController";

class VerifyToken {

    public inHeader(req: AuthRequest, res: Response, next: NextFunction) {
        // Get token from header
        const token = req.header("x-auth-token");

        // Check if no token
        if (!token) {
            //HttpStatusCodes.UNAUTHORIZED
            return res.status(401).json({ msg: "No token, authorization denied" });
        }
        // Verify token
        try {
            const payload: Payload | any = TokenController.verify(token);
            req.userId = payload.userId;
            next();
        } catch (err) {
            //HttpStatusCodes.UNAUTHORIZED
            res.status(401).json({ msg: "Token is not valid" });
        }
    }
}


export default VerifyToken
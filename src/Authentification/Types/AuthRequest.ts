//import { Request } from "express";
//import Payload from "./Payload";
//import {UserRequestContract} from "../../Users/Contracts/UserRequestContract";

/**
 * Extended Express Request interface to pass Payload Object to the request. Used by the auth middleware to pass data to the request by token signing (jwt.sign) and token verification (jwt.verify).
 * @param userId:string
 * This was working, but hard to read / extends in my POV. And it make the AuthRequest as standalone, not extending the Request of express.
 */
//type AuthRequest = Request & Payload  & { user: any };
//export default AuthRequest;

/*export interface AuthRequest extends Request {
    user: UserRequestContract;
}*/
/*declare global{
    namespace Express {
        interface Request {
            user?: UserRequestContract;
        }
    }
}*/

/*
declare global{
    namespace Express {
        interface Request {
            user: UserRequestContract;
        }
    }
}*/
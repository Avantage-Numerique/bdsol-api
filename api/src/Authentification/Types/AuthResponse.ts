import { Response } from "express";
import Payload from "./Payload";

/**
 * Extended Express Request interface to pass Payload Object to the request. Used by the auth middleware to pass data to the request by token signing (jwt.sign) and token verification (jwt.verify).
 * @param userId:string
 */
type AuthResponse = Response & Payload  & { user: any };

export default AuthResponse;
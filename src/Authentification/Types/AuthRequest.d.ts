import * as express from "express"
import {UserRequestContract} from "../../Users/Contracts/UserRequestContract";

declare global{
    namespace Express {
        interface Request {
            user: UserRequestContract;
        }
    }
}


// Request extending with user in it.
//import {UserRequestContract} from "../../Users/Contracts/UserRequestContract";
//import { Request } from 'express';

declare global {
    namespace Express {
        export interface Request {
            user?: any;
        }
    }
}
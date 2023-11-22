

// Request extending with user in it.
//import {UserRequestContract} from "../../Users/Contracts/UserRequestContract";
//import { Request } from 'express';

namespace Express {
    export interface Request {
        user?: any;
        visitor?: any;
        data?: any;
        file?: any;
    }
}
namespace Express {
    export interface Response {
        serviceResponse?: any;
        performance?: any
    }
}
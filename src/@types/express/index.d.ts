

// Request extending with user in it.
//import {UserRequestContract} from "../../Users/Contracts/UserRequestContract";
//import { Request } from 'express';

namespace Express {
    export interface Request {
        user?: any;
        data?: any;
        visitor?: any;
    }
}
namespace Express {
    export interface Response {
        serviceResponse?: any;
    }
}
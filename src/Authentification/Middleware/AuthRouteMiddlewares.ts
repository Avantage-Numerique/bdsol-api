import {VerifyTokenMiddleware} from "./VerifyTokenMiddleware";


export class AuthRouteMiddlewares {

    public static middlewares:Array<any> = [
        VerifyTokenMiddleware.middlewareFunction()
    ];

}
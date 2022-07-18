import {VerifyTokenMiddleware} from "./VerifyTokenMiddleware";


export class NeedAuthRouteMiddlewares {

    public static middlewares:Array<any> = [
        VerifyTokenMiddleware.middlewareFunction()
    ];

}
import {NextFunction, Response, Request} from "express";
import LogHelper from "../../Monitoring/Helpers/LogHelper";

export class PublicUserRequest {

    /**
     * Getter for the anonumous function that will act as the middleware, with the parameters and the next() call.
     */
    public static middlewareFunction()
    {
        /**
         * The PublicUserRequest just set an blank you
         * @param req {Request}
         * @param res {Response}
         * @param next {NextFunction}
         * @return Promise<Response<any, Record<string, any>> | undefined>
         */
        return async function (req: Request, res: Response, next: NextFunction) {
            LogHelper.info(`Public user (${req.ip}) requested : ${req.originalUrl}`);
            req.user = {
                id: "",
                username: "",
                email: "",
                avatar: "",
                name: "public",
                role: "public",
                ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
            };
            next();
        }
    }
}
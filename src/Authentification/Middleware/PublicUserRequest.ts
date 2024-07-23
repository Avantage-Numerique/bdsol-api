import {NextFunction, Request, Response} from "express";
import LogHelper from "../../Monitoring/Helpers/LogHelper";

export class PublicUserRequest {

    /**
     * Getter for the anonumous function that will act as the middleware, with the parameters and the next() call.
     */
    public static middleware()
    {
        /**
         * The PublicUserRequest just set an blank you
         * @param req {Request}
         * @param res {Response}
         * @param next {NextFunction}
         * @return Promise<Response<any, Record<string, any>> | undefined>
         */
        return async function (req: Request, res: Response, next: NextFunction) {
            /*const mediasIgnoreRegex = /(\/medias\/(person|organisation)).;
            if (req.originalUrl !== '/ping' &&
                !mediasIgnoreRegex.test(req.originalUrl)
            ) {

            }*/
            LogHelper.info(`Public user (${req.visitor.ip}) requested : ${req.originalUrl} from app/server : ${req.ip}`);
            req.user = {
                id: "",
                username: "",
                email: "",
                avatar: "",
                name: "public",
                role: "public",
                ip: req.visitor.ip,
            };
            next();
        }
    }
}
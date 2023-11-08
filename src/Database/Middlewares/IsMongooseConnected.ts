import {NextFunction, Request, Response} from "express";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import ServerController from "@src/Server/Controllers/ServerController";

export class IsMongooseConnected {

    /**
     * Getter for the anonumous function that will act as the middleware, with the parameters and the next() call.
     */
    public static middleware()
    {
        /**
         * The IsMongooseConnected function just set an blank you
         * @param req {Request}
         * @param res {Response}
         * @param next {NextFunction}
         * @return Promise<Response<any, Record<string, any>> | undefined>
         */
        return async function (req: Request, res: Response, next: NextFunction) {
            const server:ServerController|undefined = ServerController.getInstance(null);
            if (ServerController.database) {
                if (ServerController.database.isConnected()) {
                    LogHelper.info("[DB][Middleware] database is connected ! passing to next");
                } else {
                    LogHelper.error("[DB][Middleware] database isn't connected. Trying to reconnect");
                    await ServerController.database.initProviders();
                }

            }
            next();
        }
    }
}
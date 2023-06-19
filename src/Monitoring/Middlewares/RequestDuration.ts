import {NextFunction, Request, Response} from "express";
import {performance} from "perf_hooks";
import {getDurationInMilliseconds} from "@src/Helpers/DateTime";
import LogHelper from "../Helpers/LogHelper";

/**
 * Static, The RequestDuration anonymous function middleware log performance duration of the call.
 */
export class RequestDuration {

    /**
     * Getter for the anonumous function that will act as the middleware, with the parameters and the next() call.
     */
    public static middleware() {
        /**
         * The RequestDuration anonymous function to monitore current
         * @param req {Request}
         * @param res {Response}
         * @param next {NextFunction}
         */
        return async function (req: Request, res: Response, next: NextFunction) {
            //LogHelper.info(`[Monitoring][Performance][STARTED] ${req.method} ${req.originalUrl} `);

            const from = performance.now();
            res.performance = {};
            res.performance.start = from;
            res.performance.method = req.method;
            res.performance.originalUrl = req.originalUrl;

            //On finished
            res.on('finish', () => {
                res.performance.finish = getDurationInMilliseconds(from);
            });

            res.on('close', () => {
                res.performance.close = getDurationInMilliseconds(from);

                const finish:string = res.performance.finish ? res.performance.finish.toLocaleString() : 0;
                const close:string = res.performance.close ? res.performance.close.toLocaleString() : 0;

                res.performance.processing = res.performance.close - res.performance.finish;

                LogHelper.info(`[Monitoring][Performance] ${req.method} ${req.originalUrl} [finish: ${finish} ms] [close: ${close} ms] [Dif. : ${res.performance.processing.toLocaleString()}]`);
            });

            next();
        }
    }
}
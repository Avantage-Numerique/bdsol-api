import {NextFunction, Request, Response} from "express";
import {performance} from "perf_hooks";
import {getDurationInMilliseconds} from "../../Helpers/DateTime";
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
            LogHelper.info(`[Monitoring][STARTED] ${req.method} ${req.originalUrl} `);

            const from = performance.now();
            res.performance = {};
            res.performance.start = from;
            res.performance.method = req.method;
            res.performance.originalUrl = req.originalUrl;

            //On finished
            res.on('finish', () => {
                const finishDuration = getDurationInMilliseconds(from);
                res.performance.finish = finishDuration;
                LogHelper.info(`[Monitoring][FINISHED] ${req.method} ${req.originalUrl}, Request received [ ${finishDuration.toLocaleString()} ms ]`);
            });

            res.on('close', () => {
                const closeDuration = getDurationInMilliseconds(from);
                res.performance.close = closeDuration;
                res.performance.processing = closeDuration - res.performance.finish;
                LogHelper.info(`[Monitoring][CLOSED] ${req.method} ${req.originalUrl}, Request completed [ ${closeDuration.toLocaleString()} ms ]`);
            });

            next();
        }
    }
}
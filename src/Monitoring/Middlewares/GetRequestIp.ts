import {NextFunction, Request, Response} from "express";
import LogHelper from "../Helpers/LogHelper";

export class GetRequestIp {

    /**
     * Getter for the anonumous function that will act as the middleware, with the parameters and the next() call.
     */
    public static middleware() {
        /**
         * The VerifyTokenMIddleware anonymous function.
         * @param req {Request}
         * @param res {Response}
         * @param next {NextFunction}
         * @return Promise<Response<any, Record<string, any>> | undefined>
         *
         * Notes :
         * If the proxy isn't 'yours', I wouldn't trust the 'x-forwarded-for' header, because it can be spoofed. (https://stackoverflow.com/questions/10849687/express-js-how-to-get-remote-client-address)
         * You need to keep in mind that you have to put this directive proxy_set_header X-Forwarded-For $remote_addr; into your nginx configuration in case you are using your own reverse proxy.
         */
        return async function (req: Request, res: Response, next: NextFunction) {
            req.visitor = GetRequestIp.parseHeader(req);
            LogHelper.debug(req.visitor);

            next();
        }
    }

    private static parseHeader(req: Request):any {
        return {
            host: req.headers['host'] ?? "",
            ip: GetRequestIp.getVisitorIp(req),
            ips: req.ips,
            reqIp: req.ip,
            browser: req.headers['user-agent'] ?? "",
            languages: req.acceptsLanguages() ?? "",
            referer: req.headers['referer'] ?? "",
        }
    }

    private static getVisitorIp(req: Request):any {
        let ip:any="";
        if (req.headers["x-forwarded-for"]) {
            ip = (req.headers["x-forwarded-for"] as string).split(',')[0];
            LogHelper.debug('middleware get request ip', ip);
        }
        if (req.headers["x-real-ip"]) {
            ip = req.connection.remoteAddress;
        }

        if (req.connection.remoteAddress) {
            ip = req.connection.remoteAddress;
        }

        return ip;
    }
}
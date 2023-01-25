import {NextFunction, Request, Response} from "express";

/**
 * Parse the current request content type. And parse data if it's multipart.
 * inspire by : https://stackoverflow.com/questions/49784509/handle-multipart-formdata-application-json-and-text-plain-in-single-express-ha
 * @param req
 * @param res
 * @param next
 */
const multipartFormDataParser:any = async (req:Request, res:Response, next:NextFunction): Promise<any> => {
    const contentType:any = req.get('content-type');

    /**
     * Already handle by the default API middleware.
     */
    if (contentType.includes('application/json')) {
        return next();
    }

    /**
     * If it's multipart, JSON parse the req.body.data into json.
     */
    if (contentType.includes('multipart/form-data')) {
        req.body.data = JSON.parse(req.body.data);
        return next();
    }

    return next();
}
export default multipartFormDataParser;
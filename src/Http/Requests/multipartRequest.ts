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
     * This is the default content type.
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
    //throw error ? if we get there, the content-type isn't handled yet.
}
export default multipartFormDataParser;
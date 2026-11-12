import { NextFunction, Request, Response } from "express";
import JSONLDController from "../Controllers/JSONLDController";

export function injectJSONLD() {
    /**
     * The injectJSONLD anonymous function.
     * @param req {Request}
     * @param res {Response}
     * @param next {NextFunction}
     * @return Promise<Response<any, Record<string, any>> | undefined>
     */
    return (req: Request, res: Response, next: NextFunction) => {
        let jsonLDforResult;
        try {
            jsonLDforResult = JSONLDController.getInstance().createJsonLDForDocument(res.serviceResponse.data);
        } catch (error) {
            console.error("Failed to generate JSONLD from aggregation (controller.single)", error);
        }

        if (jsonLDforResult !== undefined) {
            Object.defineProperty(res.serviceResponse.data, "_jsonld", { value: jsonLDforResult, enumerable: true });
        }

        next();
    };
}

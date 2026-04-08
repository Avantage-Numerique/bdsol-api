import { NextFunction, Request, Response } from "express";
import { generateEntityContent } from "../GenerateContent";

export function injectGeneratedContent() {
    /**
     * The injectJSONLD anonymous function.
     * @param req {Request}
     * @param res {Response}
     * @param next {NextFunction}
     * @return Promise<Response<any, Record<string, any>> | undefined>
     */
    return (req: Request, res: Response, next: NextFunction) => {
        Object.defineProperty(res.serviceResponse.data, "_generated", {
            value: generateEntityContent(res.serviceResponse.data),
            enumerable: true,
        });

        next();
    };
}

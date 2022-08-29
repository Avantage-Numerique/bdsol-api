import {NextFunction, Response, Request} from "express";
import sanitizeHtml from 'sanitize-html';
import {CustomSanitizer} from "express-validator";

export class NoHtmlSanitizer {

    /**
     * Method to sanitize field with no Html field.
     * @param raw {string}
     */
    public static sanitize(raw:string):string
    {
        return sanitizeHtml(raw, NoHtmlSanitizer.options());
    }

    /**
     *
     */
    public static options():sanitizeHtml.IOptions
    {
        return {
            allowedTags: [],
            disallowedTagsMode: 'discard',
            allowedAttributes: {},
            selfClosing: [],
            allowedSchemes: [],
            allowedSchemesByTag: {},
            allowedSchemesAppliedToAttributes: [],
            allowProtocolRelative: true,
            enforceHtmlBoundary: false,
            allowedIframeHostnames: [],
            allowedIframeDomains: [],
            allowIframeRelativeUrls: false
        }
    }

    // MIDDLEWARES and CUSTOMVALIDATOR

    /**
     * Express validator, CustomSanitizer getter of the function to be added as the function.
     */
    public static validatorCustomSanitizer():CustomSanitizer {
        return (value) => {
            return NoHtmlSanitizer.sanitize(value);
        }
    }


    /**
     * Express validator, schema validator getter of the function to be added as the function.
     */
    public static validatorSchemaMiddleware():CustomSanitizer
    {
        return (value, {req, location, path}) => {
            let sanitizedValue;

            if (req.body.foo && location && path) {
                sanitizedValue = parseInt(value);
            } else {
                sanitizedValue = 0;
            }
            return sanitizedValue;
        }
    }


    public static mongoosePostMiddleware():any {
        return async (doc:any, next:any): Promise<any> =>
        {
            return next();
        }
    }


    /**
     * Middleware getter of the function to be added as the function.
     */
    public static expressMiddleware():any {
        return (req: Request, res: Response, next: NextFunction) => {
            let raw, sanitizedValue = "";

            if (req.body
                && req.body.data
                && req.body.data.description)
            {
                raw = req.body.data.description;
                sanitizedValue = NoHtmlSanitizer.sanitize(raw);
            }

            return sanitizedValue;
        }
    }

}
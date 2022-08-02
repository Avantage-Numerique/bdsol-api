import {NextFunction, Response, Request} from "express";
import sanitizeHtml from 'sanitize-html';
import {CustomSanitizer} from "express-validator";
import LogHelper from "../../Monitoring/Helpers/LogHelper";

export class HtmlSanitizer {

    /**
     * Middleware getter of the function to be added as the function.
     */
    public static richText():CustomSanitizer {
        return (value) => {
            LogHelper.debug('Sanitizing richText', value);
            return HtmlSanitizer.sanitizeRichTextField(value);
        }
    }

    /**
     * Middleware getter of the function to be added as the function.
     */
    public static noHtml():CustomSanitizer {
        return (value) => {
            LogHelper.debug('Sanitizing noHtml', value);
            return HtmlSanitizer.sanitizeNoHtmlField(value);
        }
    }


    public static middlewareSchemaValidator():CustomSanitizer
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
            LogHelper.debug(doc);
            return next();
        }
    }


    /**
     * Middleware getter of the function to be added as the function.
     */
    public static descriptionMiddleware():any {
        return (req: Request, res: Response, next: NextFunction) => {
            let raw, sanitizedValue = "";

            if (req.body
                && req.body.data
                && req.body.data.description)
            {
                raw = req.body.data.description;
                sanitizedValue = HtmlSanitizer.sanitizeRichTextField(raw);
            }

            return sanitizedValue;
        }
    }


    /**
     * Method to sanitize Rich text field with the default Html tag only.
     * @param raw {string}
     */
    public static sanitizeRichTextField(raw:string)
    {
        return sanitizeHtml(raw, HtmlSanitizer.richTextOptions());
    }


    /**
     * Method to sanitize field with no Html field.
     * @param raw {string}
     */
    public static sanitizeNoHtmlField(raw:string)
    {
        return sanitizeHtml(raw, HtmlSanitizer.noHtmlOptions());
    }


    public static richTextOptions():sanitizeHtml.IOptions
    {
        return {
            allowedTags: [
                "address", "h1", "h2", "h3", "h4", "h5", "h6",
                "blockquote", "dl", "dt", "figcaption", "figure", "hr", "li", "ol", "p", "pre",
                "ul", "a", "abbr", "b", "bdi", "bdo", "br", "cite", "code", "data", "dfn",
                "em", "i", "kbd", "mark", "q", "rtc", "s",
                "small", "span", "strong", "sub", "sup", "time", "u", "var", "wbr", "caption",
                "col", "colgroup", "table", "tbody", "td", "tfoot", "th", "thead", "tr"
            ],
            disallowedTagsMode: 'discard',
            allowedAttributes: {
                a: [ 'href', 'name', 'target' ],
                // We don't currently allow img itself by default, but
                // these attributes would make sense if we did.
                img: [ 'src', 'srcset', 'alt', 'title', 'width', 'height', 'loading' ]
            },
            // Lots of these won't come up by default because we don't allow them
            selfClosing: [ 'img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta' ],
            // URL schemes we permit
            allowedSchemes: [ 'http', 'https', 'mailto', 'tel' ],
            allowedSchemesByTag: {},
            allowedSchemesAppliedToAttributes: [ 'href', 'src', 'cite' ],
            allowProtocolRelative: true,
            enforceHtmlBoundary: false,
            allowedIframeHostnames: [],
            allowedIframeDomains: [],
            allowIframeRelativeUrls: false
        }
    }


    public static noHtmlOptions():sanitizeHtml.IOptions
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
}
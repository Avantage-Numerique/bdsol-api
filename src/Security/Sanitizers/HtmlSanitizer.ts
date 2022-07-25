import {NextFunction, Response, Request} from "express";
import sanitizeHtml from 'sanitize-html';
import {CustomSanitizer} from "express-validator";

export class HtmlSanitizer {



    /**
     * Middleware getter of the function to be added as the function.
     */
    public static validatorMiddleware():CustomSanitizer {
        return (value) => {
            return HtmlSanitizer.sanitizeHtmlValue(value);
        }
    }

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
                sanitizedValue = HtmlSanitizer.sanitizeHtmlValue(raw);
            }

            return sanitizedValue;
        }
    }


    /**
     * Middleware getter of the function to be added as the function.
     */
    public static middleware():any {
        return (req: Request, res: Response, next: NextFunction) => {
            let raw, sanitizedValue = "";

            if (req.body
                && req.body.data
                && req.body.data.description)
            {
                raw = req.body.data.description;
                sanitizedValue = HtmlSanitizer.sanitizeHtmlValue(raw);
            }

            return sanitizedValue;
        }
    }

    /**
     * Method to sanitize Html with the default content value.
     * @param raw {string}
     */
    public static sanitizeHtmlValue(raw:string)
    {
        return sanitizeHtml(raw, HtmlSanitizer.getHtmlSanitizingOption());
    }

    private static getHtmlSanitizingOption():sanitizeHtml.IOptions
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
            //allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com'],
            //allowedIframeDomains: ['zoom.us']
            //allowIframeRelativeUrls: true
        }
    }
}
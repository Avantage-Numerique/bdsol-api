import sanitizeHtml from 'sanitize-html';
import {CustomSanitizer} from "express-validator";

export class HtmlSanitizer {


    /**
     * Method to sanitize Rich text field with the default Html tag only.
     * @param raw {string}
     */
    public static sanitize(raw:string)
    {
        return sanitizeHtml(raw, HtmlSanitizer.options());
    }


    public static options():sanitizeHtml.IOptions
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


    //  MIDDLEWARE et CUSTOMSANITIZER

    /**
     * Middleware getter of the function to be added as the function.
     */
    public static validatorCustomSanitizer():CustomSanitizer {
        return (value) => {
            return HtmlSanitizer.sanitize(value);
        }
    }


    public static middlewareSchemaValidator():CustomSanitizer
    {
        return (value, {req, location, path}) => {

        }
    }

    public static mongoosePostMiddleware():any {
        return async (doc:any, next:any): Promise<any> =>
        {
            return next();
        }
    }

}
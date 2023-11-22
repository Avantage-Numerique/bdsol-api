import {CustomSanitizer} from "express-validator";
import {sanitizeUrl} from "@braintree/sanitize-url";

export class UrlSanitizer {

    /**
     * Method to sanitize URL to avoid wrongly formed url.
     * @param raw {string}
     */
    public static sanitize(raw:string)
    {
        return sanitizeUrl(raw);
    }


    public static options():any
    {
        return {};
    }


    //  MIDDLEWARE et CUSTOMSANITIZER

    /**
     * Middleware getter of the function to be added as the function.
     */
    public static validatorCustomSanitizer():CustomSanitizer {
        return (value) => {
            return UrlSanitizer.sanitize(value);
        }
    }
}
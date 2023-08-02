import {CustomSanitizer} from "express-validator";
import {sanitizeUrl} from "@braintree/sanitize-url";

export class SlugSanitizer {

    /**
     * Method to sanitize URL to avoid wrongly formed url.
     * @param raw {string}
     */
    public static sanitize(raw:string)
    {
        const removeChar = /[^a-zA-Z0-9-_]/g;//this is not sync with the actual slug middleware of the create. The package mongoose-slug-updater isn't that open for that configuration.
        raw = raw.toLowerCase();
        raw = raw.replace(removeChar, "")
            .trim();
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
            return SlugSanitizer.sanitize(value);
        }
    }
}
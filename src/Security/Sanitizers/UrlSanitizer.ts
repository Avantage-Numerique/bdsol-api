
import {CustomSanitizer} from "express-validator";
import {sanitizeUrl} from "@braintree/sanitize-url";
import {Str} from "../../Helpers/Str";

export class UrlSanitizer {

    /**
     * Method to sanitize URL to avoid wrongly formed url.
     * @param raw {string}
     */
    public static sanitize(raw:string)
    {
        //Regex.Replace(url, @"[^-A-Za-z0-9+&@#/%?=~_|!:,.;\(\)]", "");
        return sanitizeUrl(raw.replace(Str.URL, ""));
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
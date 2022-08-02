import {CustomSanitizer} from "express-validator";

export class TextSanitizer {

    /**
     * Middleware getter of the function to be added as the function.
     */
    public static middlewareSanitizer():CustomSanitizer {
        return (value) => {
            return TextSanitizer.sanitizeTextValue(value);
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


    /**
     * Method to sanitize Html with the default content value.
     * @param raw {string}
     */
    public static sanitizeTextValue(raw:string):string
    {
        return raw;
    }

}
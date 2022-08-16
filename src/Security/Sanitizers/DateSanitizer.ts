import {CustomSanitizer} from "express-validator";

export class DateSanitizer {


    /**
     * Method to sanitize Html with the default content value.
     * @param raw {string}
     */
    public static sanitize(raw:string):string
    {
        return raw;
    }


    public static options():any
    {
        return {
            format: "YYYY-MM-DD",
        }
    }


    /**
     * Middleware getter of the function to be added as the function.
     */
    public static validatorCustomSanitizer():CustomSanitizer {
        return (value) => {
            return DateSanitizer.sanitize(value);
        }
    }

}
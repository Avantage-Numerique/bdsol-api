import {CustomSanitizer} from "express-validator";

export class EnumSanitizer {

    /**
     * Method to sanitize Html with the default content value.
     * @param raw {string}
     */
    public static sanitize(raw:string, targetEnum:any):string
    {
        return raw;
    }


    public static options():any
    {
        return {};
    }


    /**
     * Middleware getter of the function to be added as the function.
     */
    public static validatorCustomSanitizer(targetEnum:any):CustomSanitizer {
        return (value) => {
            return EnumSanitizer.sanitize(value, targetEnum);
        }
    }

}
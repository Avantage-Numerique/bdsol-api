import {CustomSanitizer} from "express-validator";

export class IntSanitizer {

    /**
     * Method to sanitize Html with the default content value.
     * @param raw {string}
     */
    public static sanitize(raw:string):number
    {
        return parseInt(raw);
    }

    /**
     * Middleware getter of the function to be added as the function.
     */
    public static validatorCustomSanitizer():CustomSanitizer {
        return (value) => {
            return IntSanitizer.sanitize(value);
        }
    }
}
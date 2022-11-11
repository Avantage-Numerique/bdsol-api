import type {CustomSanitizer} from "express-validator";
import {Str} from "../../Helpers/Str";

export class ObjectIdStringSanitizer {
    /**
     * Method to sanitize string and remove all accents
     * @param raw {string}
     */
    public static sanitize(raw:string):string
    {
        return Str.toObjectIdAllowedCharacter(raw);//OBJECTID_ALLOWED_CHAR
    }

    //  MIDDLEWARE et CUSTOM SANITIZER

    /**
     * Middleware getter of the function to be added as the function.
     */
    public static validatorCustomSanitizer():CustomSanitizer {
        return (value) => {
            return ObjectIdStringSanitizer.sanitize(value);
        }
    }

}
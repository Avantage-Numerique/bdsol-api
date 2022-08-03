import type {CustomSanitizer} from "express-validator";
import {Str} from "../../Helpers/Str";
import LogHelper from "../../Monitoring/Helpers/LogHelper";

export class NoSpaceSanitizer {


    /**
     * Method to sanitize string and remove all accents
     * @param raw {string}
     */
    public static sanitize(raw:string):string
    {
        return Str.noSpaces(raw);
    }


    //  MIDDLEWARE et CUSTOM SANITIZER

    /**
     * Middleware getter of the function to be added as the function.
     */
    public static validatorCustomSanitizer():CustomSanitizer {
        return (value) => {
            LogHelper.debug('Sanitizing To no space', value);
            return NoSpaceSanitizer.sanitize(value);
        }
    }

}
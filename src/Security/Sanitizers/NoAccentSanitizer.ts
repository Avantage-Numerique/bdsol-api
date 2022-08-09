import type {CustomSanitizer} from "express-validator";
import _ from 'lodash';

export class NoAccentSanitizer {


    /**
     * Method to sanitize string and remove all accents
     * @param raw {string}
     */
    public static sanitize(raw:string):string
    {
        return _.deburr(raw);
    }


    //  MIDDLEWARE et CUSTOM SANITIZER

    /**
     * Middleware getter of the function to be added as the function.
     */
    public static validatorCustomSanitizer():CustomSanitizer {
        return (value) => {
            return NoAccentSanitizer.sanitize(value);
        }
    }

}
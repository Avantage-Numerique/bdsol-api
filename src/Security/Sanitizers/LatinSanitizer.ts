import {CustomSanitizer} from "express-validator";
import _ from 'lodash';

export class LatinSanitizer {


    /**
     * Method to sanitize string and remove all accents
     * @param raw {string}
     */
    public static sanitize(raw:string)
    {
        return _.deburr(raw);
    }


    //  MIDDLEWARE et CUSTOM SANITIZER

    /**
     * Middleware getter of the function to be added as the function.
     */
    public static validatorCustomSanitizer():CustomSanitizer {
        return (value) => {
            return LatinSanitizer.sanitize(value);
        }
    }

}
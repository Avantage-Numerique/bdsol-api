import {CustomSanitizer} from "express-validator";
import {Obj} from "../../Helpers/Obj";

export class EnumSanitizer {

    /**
     * Method to sanitize Html with the default content value.
     * @param targetEnum {enum}
     * @param raw {string}
     */
    public static sanitize(raw:string, targetEnum:any):string
    {
        if (Obj.enumHave(targetEnum, raw)) {
            return raw;
        }
        throw new Error(`${raw} is not set in the API`);
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
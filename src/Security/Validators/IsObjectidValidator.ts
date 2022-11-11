import {CustomValidator} from 'express-validator';
import mongoose from "mongoose";


export class IsObjectIdStringValid {
    /**
     * Method to validate string is ObjectId with the Mongoose method.
     * @param raw {string}
     * @return Boolean
     */
    public static validate(raw:string):Boolean
    {
        return mongoose.isObjectIdOrHexString(raw);//https://mongoosejs.com/docs/api.html#mongoose_Mongoose-isObjectIdOrHexString
    }

    //  MIDDLEWARE et CUSTOM Validator

    /**
     * Middleware getter of the function to be added as the function.
     */
    public static validatorCustom():CustomValidator {
        return (value) => {
            return IsObjectIdStringValid.validate(value);
        }
    }
}
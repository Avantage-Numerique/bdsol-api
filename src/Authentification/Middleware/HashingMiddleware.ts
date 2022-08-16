import {PasswordsController} from "../Controllers/PasswordsController";
import LogHelper from "../../Monitoring/Helpers/LogHelper";

export class HashingMiddleware {

    public static mongooseMiddlewareHandler():any
    {
        return async function(next:any): Promise<any>
        {
            //@ts-ignore
            if (!this.isModified('password')) return next();

            try {
                //@ts-ignore
                this.password = await PasswordsController.hash(this.password);
            } catch(error:any) {
                throw error;
            }
            return next();
        }
    }
}

//this need to be that way, because this, need to be in the scope of the event not this file nor this funciton.
export const hashingPasswordAnonymousMiddleware = async function(next:any): Promise<any>
{
    LogHelper.debug("Hashing Middleware as a function in pre events.");
    //@ts-ignore
    if (this && !this.isModified('password')) {
        return next();
    }

    try {
        //@ts-ignore
        this.password = await PasswordsController.hash(this.password);  // This doesn't work, in an anonymous function, the PasswordsController, isn't found. We should add
    } catch(error:any) {
        throw error;
    }
    return next();
}
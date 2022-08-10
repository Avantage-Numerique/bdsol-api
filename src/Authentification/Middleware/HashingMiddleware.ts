import {PasswordsController} from "../Controllers/PasswordsController";

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
export const hashPasswordMiddleware = function(next:any): Promise<any>
{
    //@ts-ignore
    if (this && !this.isModified('password')) return next();

    try {
        //@ts-ignore
        this.password = await PasswordsController.hash(this.password);
    } catch(error:any) {
        throw error;
    }
    return next();
}
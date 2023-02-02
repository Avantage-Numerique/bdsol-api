import {PasswordsController} from "../Controllers/PasswordsController";

export class HashingMiddleware {

    public static mongooseMiddlewareHandler():any
    {
        return async function(next:any): Promise<any>
        {
            //@ts-ignore
            let document:any = this;

            if (!document.isModified('password')) return next();

            try {
                document.password = await PasswordsController.hash(document.password);
            } catch(error:any) {
                throw error;
            }
            return next();
        }
    }

    public static mongooseMiddlewareFindOneAndUpdateHandler():any
    {
        return async function(next:any): Promise<any>
        {
            //@ts-ignore
            let document:any = this,
                options:any = document.getOptions(),//return directly the options set in the initial call
                updatedEntry:any;

            if (options.upsert === true) {
                updatedEntry = document.getUpdate().$setOnInsert;
            } else {
                updatedEntry = document.getUpdate();
            }

            if (updatedEntry.password === undefined) return next();

            try {

                updatedEntry.password = await PasswordsController.hash(updatedEntry.password);

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
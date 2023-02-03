import {PasswordsController} from "../Controllers/PasswordsController";

export class HashingMiddleware {

    public static handler():any
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

    public static findOneAndUpdateHandler():any
    {
        return async function(next:any): Promise<any>
        {
            //@ts-ignore
            let document:any = this,
                //options:any = document.getOptions(),//return directly the options set in the initial call
                updatedEntry:any = document.getUpdate();

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
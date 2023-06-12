import {PasswordsController} from "../Controllers/PasswordsController";

export class HashingMiddleware {

    public static handler():any
    {
        return async function(next:any): Promise<any>
        {
            if (!this.isModified('password')) return next();
            this.password = await PasswordsController.hash(this.password);

            return next();
        }
    }

    public static findOneAndUpdateHandler():any
    {
        return async function(next:any): Promise<any>
        {
            const updatedEntry:any = this.getUpdate();

            if (updatedEntry.password === undefined)  return next();
            updatedEntry.password = await PasswordsController.hash(updatedEntry.password);

            return next();
        }
    }
}
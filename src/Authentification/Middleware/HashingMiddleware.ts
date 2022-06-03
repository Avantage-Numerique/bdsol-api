import {PasswordsController} from "../Controllers/PasswordsController";

export class HashingMiddleware {

    mongooseMiddlewareHandler():any {
        return async (next:any): Promise<any> =>
        {
            const user:any = this;
            if (!user.isModified('password')) {
                return next();
            }
            try
            {
                user.password = await PasswordsController.hash(user.password);
            }
            catch(error:any)
            {
                throw error;
            }
            return next();
        }
    }
}
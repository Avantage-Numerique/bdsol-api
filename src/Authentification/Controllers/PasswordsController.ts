import argon2 from "argon2";

/**
 * Controller to manage the password hashings operations.
 * used in AuthentificationController.
 */
export class PasswordsController
{
    /**
     * hash target password and return the hased version to be stored like that.
     * @param password {string}
     */
    public static async hash(password:string):Promise<string>
    {
        try {
            return await argon2.hash(password, {
                type: argon2.argon2id,
                memoryCost: 2 ** 16,
                hashLength: 50,
            });
        }
        catch (error:any)
        {
            throw error;
        }
    }


    /**
     * Verify the target passed with an hashed and stored version.
     * @param storedPassword {string} Hashed stored password
     * @param targetPassword {string} target password, mainly in login.
     */
    public static async matches(storedPassword:string, targetPassword:string):Promise<boolean>
    {
        try
        {
            //directly return the verify response on try.
            return await argon2.verify(storedPassword, targetPassword);
        }
        catch (error:any)
        {
            throw error;
        }
    }
}
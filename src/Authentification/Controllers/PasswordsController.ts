import argon2 from "argon2";

/**
 * Controller to manage the password hashings operations.
 * used in AuthentificationController.
 */
export class PasswordsController
{
    /**
     * hash target password and return the hased version to be stored like that.
     * We used parameters bigger that the OWASP configuration :
     * > If Argon2id is not available, use bcrypt with a work factor of 10 or more and with a password limit of 72 bytes.
     * https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
     * @param password {string}
     */
    public static async hash(password:string):Promise<string>
    {
        // we use the default argon2 salting function as says in the doc : The default value is unset, which generates a cryptographically safe random salt.
        return await argon2.hash(password, {
            type: argon2.argon2id,
            memoryCost: 2 ** 16,
            hashLength: 50,
        });
    }


    /**
     * Verify the target passed with an hashed and stored version.
     * @param storedPassword {string} Hashed stored password
     * @param targetPassword {string} target password, mainly in login.
     */
    public static async matches(storedPassword:string, targetPassword:string):Promise<boolean>
    {
        //directly return the verify response on try.
        return await argon2.verify(storedPassword, targetPassword);
    }
}
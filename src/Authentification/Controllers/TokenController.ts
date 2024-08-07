import * as jwt from "jsonwebtoken";
import {JwtPayload, VerifyErrors} from "jsonwebtoken";
import {getApiConfig} from "@src/config";
import {now} from "@src/Helpers/DateTime";
import LogHelper from "@src/Monitoring/Helpers/LogHelper";

/**
 * Controller to manage the token operation
 * used in AuthentificationController.
 */
export class TokenController {

    static config:any;

    /**
     * Use un Authenfication mainly, with user data as : { username: user.username,  role: user.role }
     * @param encapsulateData object encapsulate this object in the token.
     */
    public static generate(encapsulateData:any):string
    {
        TokenController.initConfig();

        return jwt.sign(encapsulateData, TokenController.config.tokenSecret, TokenController.config.jwt.defaultOptions);
    }

    public static initConfig() {
        if (TokenController.config === undefined || TokenController.config === null) {
            TokenController.config = getApiConfig();
        }
    }

    /**
     * Check if the token can be verify by the jsonwebtoken.verify function.
     * It assign the results to the callback TokenController.onVerifyToken
     * @param token
     */
    public static async verify(token:string):Promise<string|JwtPayload|undefined|any>
    {
        let verifiedToken;
        TokenController.initConfig();
        try {
            await jwt.verify(
                token,
                TokenController.config.tokenSecret,
                (err:any, decoded:any) => {
                    verifiedToken = TokenController.onVerifyToken(err, decoded);
                }
            );
            return verifiedToken;

        } catch (error:any)
        {
            LogHelper.error(`Verify Token Error ${error.message}`, error);
            // escalade the erry to the next try and catch.
            throw error;
        }

    }


    /**
     * Callback of the jwt.verify, to handle the error and the decoded value in the TokenController Scope.
     * Exemple de d'erreur avec les tokens :
     * err = {
        name: 'TokenExpiredError',
        message: 'jwt expired',
        expiredAt: 1408621000
      }

     JsonWebTokenError

     Error object:

     name: 'JsonWebTokenError'
     message:
     'jwt malformed'
     'jwt signature is required'
     'invalid signature'
     'jwt audience invalid. expected: [OPTIONS AUDIENCE]'
     'jwt issuer invalid. expected: [OPTIONS ISSUER]'
     'jwt id invalid. expected: [OPTIONS JWT ID]'
     'jwt subject invalid. expected: [OPTIONS SUBJECT]'
     *
     * Token anatomy :
     * //{"user_id":"6271b8ceee860ac5d96a32be","username":"datageek","role":"admin","iat":1652801210,"exp":1652887610}]
     * @param err {VerifyErrors|null}
     * @param decoded {JwtPayload|null}
     * @protected
     */
    protected static onVerifyToken(err:VerifyErrors|null, decoded:any|JwtPayload|undefined)
    {
        if (err)
        {
            //could be : JsonWebTokenError
            // could be : TokenExpiredError
            throw err;
        }

        if (TokenController.isValid(decoded) &&
            TokenController.isActive(decoded))
        {
            // we assume here,it will be an Object that we can deconstructed.
            decoded.validated = true;
            return decoded;
        }
        throw new Error('Token format is wrong.');
    }


    /**
     * @Deprecated
     * @param verifiedToken {any} Likely to be an object.
     * @protected
     */
    protected static updateTokenLife(verifiedToken:any):any
    {
        if (TokenController.isValid(verifiedToken) &&
            TokenController.isActive(verifiedToken))
        {
            //const now = date();
            //if augment lifespan
            //add params with last updated
            //add params with the count of request
            return verifiedToken;
        }
    }

    protected static isActive(verifiedToken:any):any
    {
        if (TokenController.isValid(verifiedToken))
        {
            return now() >= verifiedToken.exp;
        }
        return false
    }


    protected static isValid (verifiedToken:any):any {
        return verifiedToken &&
            verifiedToken.iat !== undefined &&
            verifiedToken.iat >= 0 &&
            verifiedToken.exp !== undefined &&
            verifiedToken.exp >= 0 &&
            verifiedToken._id !== undefined &&
            verifiedToken.username !== undefined &&
            verifiedToken.role !== undefined;
    }

    public static generateUserToken(user:any):string
    {
        return TokenController.generate(user);
    }

}
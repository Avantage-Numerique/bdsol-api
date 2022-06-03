import * as jwt from "jsonwebtoken";
import config from "../../config";
import {JwtPayload, VerifyErrors} from "jsonwebtoken";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import {now} from "../../Helpers/DateTime";

/**
 * Controller to manage the token operation
 * used in AuthentificationController.
 */
export class TokenController {

    /**
     * Use un Authenfication mainly, with user data as : { username: user.username,  role: user.role }
     * @param encapsulateData object encapsulate this object in the token.
     */
    public static generate(encapsulateData:any):string
    {
        //verify type of the encapsulate Data ?
        return jwt.sign(encapsulateData, config.tokenSecret, config.jwt.defaultOptions);
    }

    /**
     * Check if the token can be verify by the jsonwebtoken.verify function.
     * It assign the results to the callback TokenController.onVerifyToken
     * @param token
     */
    public static async verify(token:string):Promise<string|JwtPayload|undefined>
    {
        let user;
        await jwt.verify(
            token,
            config.tokenSecret,
            (err, decoded) => {
                user = TokenController.onVerifyToken(err, decoded);
            }
        );
        return user;
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
    protected static onVerifyToken(err:VerifyErrors|null, decoded:string|JwtPayload|undefined)
    {
        LogHelper.info("TokenController.onVerifyToken", err, decoded);
        if (err)
        {
            LogHelper.error("TokenController.onVerifyToken error", err, decoded);
            //could be : JsonWebTokenError
            // could be : TokenExpiredError
            throw err;
        }
        if (TokenController.isValid(decoded) &&
            TokenController.isActive(decoded)) {
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
            verifiedToken.user_id !== undefined &&
            verifiedToken.username !== undefined &&
            verifiedToken.role !== undefined;
    }


}
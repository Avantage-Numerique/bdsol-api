import * as jwt from "jsonwebtoken";
import config from "../../config";
import {JwtPayload, VerifyErrors} from "jsonwebtoken";
import LogHelper from "../../Monitoring/Helpers/LogHelper";

/**
 * Controller to manage the token operation
 * used in AuthentificationController.
 */
export class TokenController {

    /**
     * Use un Authenfication mainly, with user data as : { username: user.username,  role: user.role }
     * @param encapsulateData object encapsulate this object in the token.
     */
    public static generate(encapsulateData:any):string {
        //verify type of the encapsulate Data ?
        return jwt.sign(encapsulateData, config.tokenSecret, config.jwt.defaultOptions);
    }

    /**
     * Check if the token can be verify by the jsonwebtoken.verify function.
     * It assign the results to the callback TokenController.onVerifyToken
     * @param token
     */
    public static verify(token:string):any {
        return jwt.verify(
            token,
            config.tokenSecret,
            (err, decoded) => TokenController.onVerifyToken
        );
    }

    /**
     * Callback of the jwt.verify, to handle the error and the decoded value in the TokenController Scope.
     * @param err {VerifyErrors|null}
     * @param decoded {JwtPayload|null}
     * @protected
     */
    protected static async onVerifyToken(err:VerifyErrors|null, decoded:JwtPayload|null)
    {
        if (err) {
            throw err;
        }
        LogHelper.info("TokenController.onVerifyToken", err, decoded);
    }
}
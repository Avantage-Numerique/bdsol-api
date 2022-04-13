import * as jwt from "jsonwebtoken";
import config from "../../config";

export class TokenController {

    /**
     * Use un Authenfication mainly, with user data as : { username: user.username,  role: user.role }
     * @param encapsulateData object encapsulate this object in the token.
     */
    public static generate(encapsulateData:any):string {
        //verify type of the encapsulate Data ?
        return jwt.sign(encapsulateData, config.tokenSecret);
    }

    public static isValid(token:string):any {
        return token;
    }

    public static verify(token:string):any {
        return jwt.verify(token, config.tokenSecret);
    }
}
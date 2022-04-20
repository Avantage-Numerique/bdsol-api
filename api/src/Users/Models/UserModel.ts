
// Database connection.
//temp fake to have the JWT token first,
import * as mongoDB from "mongodb";
import UserAuthContract from "../../Authentification/Contracts/UserAuthContract";
import LogHelper from "../../Monitoring/Helpers/LogHelper";


/**
 *  @deprecated UserModel
 */
export default class UserModel {
    static collection: mongoDB.Collection | null;

    username:string;
    email:string;
    password:string;
    name:string;
    role: string;

    constructor(UserDocument: mongoDB.Document | null) {

        this.username = "";
        this.email = "";
        this.password = "";
        this.name = "";
        this.role = "";

        if (UserDocument !== null) {
            this.username = UserDocument.username;
            this.email = UserDocument.email;
            this.password = UserDocument.password;
            this.name = UserDocument.name;
            this.role = UserDocument.role;
        }
    }

    public static async findOne(userInfo:UserAuthContract):Promise<mongoDB.Document | null> {
        if (UserModel.collection !== null) {
            return await UserModel.collection.find({
                'username': userInfo.username,
                'password': userInfo.password
            });
        }
        LogHelper.warn('UserModel collection is null');
        return null;
    }
}
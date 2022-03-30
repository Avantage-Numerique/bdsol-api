
// Database connection.
import UserAuthContract from "../../Authentification/Contracts/UserAuthContract";
import {UserContract} from "./UserModel";
import LogHelper from "../../Monitoring/Helpers/LogHelper";


/**
 *
 */
export default class FakeUserModel {
    static collection:Array<UserContract>;

    username:string;
    email:string;
    password:string;
    name:string;
    role: string;

    constructor(UserDocument: any | null) {

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

    public static async findOne(userInfo:UserAuthContract):Promise<UserContract | undefined> {
        if (FakeUserModel.collection !== null) {
            return FakeUserModel.collection.find(u => { return u.username === userInfo.user && u.password === userInfo.password });
        }
        LogHelper.warn('FakeUserModel collection is null');
        return undefined;
    }
}
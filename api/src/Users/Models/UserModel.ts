
// Database connection.
//temp fake to have the JWT token first,
import * as mongoDB from "mongodb";
import {UserCredential} from "../../Authentification/Controllers/AuthenficationController";


/**
 *
 */
export interface User {
    collection: mongoDB.Collection | null;
    username:string;
    email:string;
    password:string;
    name:string;
    role: string;
}

/**
 *
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

    public static async findOne(userInfo:UserCredential):Promise<mongoDB.Document | null> {
        if (UserModel.collection !== null) {
            return await UserModel.collection.findOne({
                'username': userInfo.user,
                'password': userInfo.password
            });
        }
        return null;
    }
}
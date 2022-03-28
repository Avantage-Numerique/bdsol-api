
// Database connection.
//temp fake to have the JWT token first,
import * as mongoDB from "mongodb";
import {UserCredential} from "../Controllers/AuthenficationController";

export const fakeUsers = [
    {
        username: 'datageek',
        name: 'Hydile Durocher',
        email: 'datageek@test.com',
        password: '1234',
        role: 'admin'
    },{
        username: 'annamontana',
        name: "Chantal Carpediem",
        email: 'annamontana@test.com',
        password: 'password123member',
        role: 'member'
    }
];


export interface User {
    collection: mongoDB.Collection | null;
    username:string;
    email:string;
    password:string;
    name:string;
    role: string;
}

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

/*export default class UserModel {
    username: string;
    password: string;
    email: string;
    name: string;
    role: string;

    constructor(document:object) {
        this.username = document.username;
        this.password = document.password;
        this.email = document.email;
        this.name = document.name;
        this.role = document.role;
    }
}*/
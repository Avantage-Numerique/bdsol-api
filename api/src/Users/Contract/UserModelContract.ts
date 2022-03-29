import * as mongoDB from "mongodb";
import {UserContract} from "../Models/UserModel";
//import UserAuthContract from "../../Authentification/Contracts/UserAuthContract";

export interface UserModelContract {
    collection: mongoDB.Collection | Array<UserContract> | null;
    username:string;
    email:string;
    password:string;
    name:string;
    role: string;
    //async findOne: (userInfo:UserAuthContract) => Promise<UserContract | mongoDB.Document | undefined>;
}
import * as mongoDB from "mongodb";

export interface UserModelContract {
    collection: mongoDB.Collection | null;
    username:string;
    email:string;
    password:string;
    name:string;
    role: string;
    //async findOne: (userInfo:UserAuthContract) => Promise<UserContract | mongoDB.Document | undefined>;
}
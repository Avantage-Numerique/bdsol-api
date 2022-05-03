//src/models/Post.js
import mongoose from "mongoose";
import {UserSchema} from "../Schemas/UserSchema";
import DbProvider from "../../Database/Providers/DbProvider";


/**
 *
 */
export interface UserContract {
    username:string;
    email:string;
    password:string;
    name:string;
    role: string;
}

class User {
    static collectionName:string = 'users';
    static modelName:string = 'User';
    static connection:mongoose.Connection;
    static provider:DbProvider|null;

    static initSchema() {
        User.connection.model(User.modelName, UserSchema.schema());
    }

    static getInstance() {

        if (User.connection !== null) {
            User.initSchema();
            return User.connection.model(User.modelName);
        }
        return null;
    }

    static providerIsSetup():boolean {
        return User.provider !== undefined &&
            User.provider !== null &&
            User.provider.connection !== undefined;
    }
}

export default User;


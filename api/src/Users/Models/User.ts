//src/models/Post.js
import mongoose from "mongoose";
import {UserSchema} from "../Schemas/UserSchema";


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
}

export default User;


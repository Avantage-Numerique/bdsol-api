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
    static modelName:string = 'User';

    static initSchema() {
        mongoose.model(User.modelName, UserSchema);
    }

    static getInstance() {
        User.initSchema();
        return mongoose.model(User.modelName);
    }
}

export default User;


//src/models/Post.js
import mongoose, { Schema } from "mongoose";
import {UserSchema} from "../Schemas/UserSchema";

class User {

    static initSchema() {
        mongoose.model("user", UserSchema);
    }

    static getInstance() {
        User.initSchema();
        return mongoose.model("User");
    }
}

export default User;


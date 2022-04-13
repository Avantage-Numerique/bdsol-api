import {Schema, Document} from "mongoose"

/**
 *
 */
export interface UserDocument extends Document {
    username:string;
    email:string;
    password:string;
    name:string;
    role: string;
    avatar:string;
}

export interface UserPublicDocument extends Document {
    username:string;
    email:string;
    name:string;
    role: string;
    avatar:string;
}

export const UserSchema = new Schema<UserDocument>({
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        avatar: String,
        name: String,
        role: String
    },
        {
        timestamps: true
});
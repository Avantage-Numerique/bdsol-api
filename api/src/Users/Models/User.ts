
import mongoose from "mongoose";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import {UserSchema} from "../UsersDomain";
import {DbProvider} from "../../Database/DatabaseDomain";

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

/**
 * Model User
 */
export class User {
    static collectionName:string = 'users';
    static modelName:string = 'User';
    static connection:mongoose.Connection;
    static provider:DbProvider|undefined;

    public static initSchema()
    {
        User.connection.model(User.modelName, UserSchema.schema());
    }

    public static getInstance()
    {
        LogHelper.debug("User get instance", User.connection);
        if (User.providerIsSetup()) {
            User.initSchema();
            return User.connection.model(User.modelName);
        }
        return null;
    }

    public static providerIsSetup():boolean
    {
        return User.provider !== undefined &&
            User.provider !== null &&
            User.provider.connection !== undefined;
    }

}
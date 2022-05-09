
import mongoose from "mongoose";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import type {DbProvider} from "../../Database/DatabaseDomain";
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
        if (User.connectionIsSetup()) {
            User.initSchema();
            return User.connection.model(User.modelName);
        }
        return null;
    }

    public static connectionIsSetup():boolean
    {
        LogHelper.debug(User.connection);
        return User.connection !== undefined &&
            User.connection !== null;
    }

    public static providerIsSetup():boolean
    {
        LogHelper.debug(User.provider);
        return User.provider !== undefined &&
            User.provider !== null &&
            User.provider.connection !== undefined;
    }

}
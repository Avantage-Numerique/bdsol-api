
import mongoose, {Schema} from "mongoose";
import type {DbProvider} from "../../Database/DatabaseDomain";
import {UserContract} from "../Contracts/UserContract";
import AbstractModel from "../../Abstract/Model";
import {PasswordsController} from "../../Authentification/Controllers/PasswordsController";
import { UserDocument } from "../Schemas/UserSchema";
import * as fs from 'fs';
import {HashingMiddleware} from "../../Authentification/Middleware/HashingMiddleware";

export class User extends AbstractModel {

    /** @protected @static Singleton instance of model User */
    protected static _instance:User;

    /** @public @static Model singleton instance constructor */
    public static getInstance():User {
        if (User._instance === undefined) {
            User._instance = new User();
            User._instance.initSchema();
            User._instance.assignDbEventsToSchema();
        }
        return User._instance;
    }

    /** @public Model name */
    modelName:string = 'User';

    /** @public Collection name in database */
    collectionName:string = 'users';

    /** @public Connection mongoose */
    connection:mongoose.Connection;
    provider:DbProvider;
    mongooseModel:mongoose.Model<any>;

    /** @public Database schema */
    schema:Schema =
        new Schema<UserContract>({
                username: {type: String, required: true, unique: true},
                email: {type: String, required: true, unique: true},
                password: {type: String, required: true},
                avatar: String,
                name: String,
                role: String
            },
            {
                timestamps: true
            });


    /** @public Used to return attributes and rules for each field of this entity. */
    fieldInfo = {
        "route": "",
        "field": [
            {
                "name": "username",
                "label": "Nom d'utilisateur",
                "type": "String",
                "rules": []
            },
            {
                "name": "email",
                "label": "Votre courriel",
                "type": "String",
                "rules": []
            },
            {
                "name": "password",
                "label": "Mot de passe",
                "type": "String",
                "rules": []
            },
            {
                "name": "avatar",
                "label": "Votre avatar hébergé sur le web",
                "type": "String",
                "rules": []
            },
            {
                "name": "name",
                "label": "Votre nom (qui sera afficher et assigné à vos publications et modification publique",
                "type": "String",
                "rules": []
            }
            //no role : It's an api option
        ]
    };

    /** @public Rule set for every field of this entity for each route */
    ruleSet:any = {
        "default":{
            "id":["idValid"],
            "username":["isString"],//maxLength
            "email":["isString"],//isEmail
            "password":["isString"],
            "avatar":["isString"],//isUrl
            "name":["isString"]//maxLength
        },
        "create":{
            "username":["isDefined", "minLength:2", "maxLength:15"],
            "email":["isDefined", "minLength:2"],
            "password":["isDefined", "minLength:4"]
        },
        "update":{
            "id":["isDefined"]
        },
        "search":{
        },
        "list":{
        },
        "delete":{
            "id":["isDefined"]
        }
    }

    /**
     * @get the field that are searchable.
     * @return {Object} the field slug/names.
     */
    get searchSearchableFields():object {
        return ["To be completed"];
    }

    /**
     * @public @method formatRequestDataForDocument Format the data for this entity
     * @param {any} requestData - Data to format
     * @return {UserDocument} The entity formated to schema
     */
    public formatRequestDataForDocument(requestData:any):any {
        return {
            username: requestData.username,
            email: requestData.email,
            password: requestData.password,
            avatar: requestData.avatar,
            name: requestData.name
        } as UserDocument;
    }

    /**
     * @public @method dataTransfertObject Format the document for the public return.
     * @param document
     * @return {any}
     */
    public dataTransfertObject(document: any):any {
        return {
            username: document.username,
            avatar: document.avatar,
            name: document.name,
        }
    }

    public async documentation():Promise<any> {
        return fs.readFileSync('/api/doc/Users.md', 'utf-8');
   }

    public async assignDbEventsToSchema()
    {
        if (this.schema !== undefined)
        {
            // CREATE users, we hash the password.
            await this.schema.pre('save', HashingMiddleware.mongooseMiddlewareHandler());
            await this.schema.pre('UpdateOne', HashingMiddleware.mongooseMiddlewareHandler());
        }
    }

}
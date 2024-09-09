import mongoose, {Schema} from "mongoose";
import type {DbProvider} from "../../Database/DatabaseDomain";
import {UserContract} from "../Contracts/UserContract";
import AbstractModel from "../../Abstract/Model";
import * as fs from 'fs';
import {HashingMiddleware} from "@auth/Middleware/HashingMiddleware";
import {UsersService} from "../Services/UsersService";


export class User extends AbstractModel {

    /** @protected @static Singleton instance of model User */
    protected static _instance:User;

    /** @public @static Model singleton instance constructor */
    public static getInstance():User {
        if (User._instance === undefined) {
            User._instance = new User();

            User._instance.registerPreEvents();

            User._instance.schema.virtual("type").get( function () { return User._instance.modelName });
            User._instance.initSchema();
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
    service:UsersService;
    mongooseModel:mongoose.Model<any>;

    /** @public Database schema */
    schema:Schema =
        new Schema<UserContract>({
                username: {
                    type: String,
                    required: true,
                    unique: true
                },
                email: {
                    type: String,
                    required: true,
                    unique: true
                },
                password: {
                    type: String,
                    required: true
                },
                avatar: {
                    type:String
                },
                name: {
                    type:String
                },
                firstName: {
                    type:String
                },
                lastName: {
                    type:String
                },
                role: {
                    type:String
                },
                tos: {
                    accepted: { type: Boolean, default:false },
                    acceptedOn: { type: Date },
                    ipAddress : { type: String }
                },
                verify: {
                    isVerified: { type: Boolean, default:false },
                    token: { type: String },
                    expireDate: { type: Date },
                    validatedOn: { type: Date },
                    ipAddress : { type: String }
                },
                changePassword: {
                    token: { type:String },
                    expireDate: { type: Date },
                    ipAddress : { type: String }
                },
                lastLogin: { type: Date, default: new Date }
            },
            {
                toJSON: { virtuals: true },
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

    public registerIndexes() {
        return true;
    }

    public dropIndexes() {
        return true;
    }

    /**
     * @get the field that are searchable.
     * @return {Object} the field slug/names.
     */
    get searchSearchableFields():object {
        return ["To be completed"];
    }

    public publicFields():string {
        return "name firstName lastname avatar"
    }

    /**
     * @public @method dataTransfertObject Format the document for the public return.
     * @param document
     * @return {any}
     */
    public dataTransfertObject(document: any):any {
        return {
            _id: document._id ?? '',
            username: document.username ?? '',
            avatar: document.avatar ?? '',
            name: document.name ?? '',
            firstName: document.firstName ?? '',
            lastName: document.lastName ?? '',
            email: document.email ?? '',
            role: document.role ?? '',
            type: document.type ?? '',
            verify: { isVerified: document?.verify?.isVerified ?? false},
            lastLogin: document.lastLogin ?? '',
            createdAt: document.createdAt ?? '',
            updatedAt: document.updatedAt ?? '',
        }
    }


    public async documentation():Promise<any> {
        return fs.readFileSync('/api/doc/Users.md', 'utf-8');
   }

    /**
     * The model's events that needs to be done during the mongoose phases
     * for now :
     * Pre->Save
     * Pre->UpdateOne.
     */
    public registerPreEvents()
    {
        //if (this.schema !== undefined)
        //{
            // CREATE users, we hash the password.
            this.schema.pre('save', HashingMiddleware.handler());
            this.schema.pre('updateOne', HashingMiddleware.handler());//
            this.schema.pre('findOneAndUpdate', HashingMiddleware.findOneAndUpdateHandler());//this is used in updateOrCreate method.
        //}
    }

}

import mongoose, {Schema} from "mongoose";
import type {DbProvider} from "../../Database/DatabaseDomain";
import {UserSchema} from "../Schemas/UserSchema";
import AbstractModel from "../../Abstract/Model";
import {PersonneSchema} from "../../Personnes/Schemas/PersonneSchema";

/**
 *
 */
export interface UserContract {
    username:string;
    email:string;
    password:string;
    avatar:string;
    name:string;
    role: string;
}

/**
 * Model User
 */
export class User extends AbstractModel {

    //  Singleton.
    protected static _instance:User;

    public static getInstance():User
    {
        if (User._instance === undefined) {
            User._instance = new User();
            User._instance.initSchema();
        }
        return User._instance;
    }

    /** @public Nom du modèle */
    modelName:string = 'User';

    /** @public Nom de la collection dans la base de donnée */
    collectionName:string = 'users';

    /** @public Connection mongoose */
    connection:mongoose.Connection;

    provider:DbProvider;

    mongooseModel:mongoose.Model<any>;


    /** @public Schéma pour la base de donnée */
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


    /** @static infoChamp pour le retour frontend des champs à créer et règles des attributs de personne selon la route */
    infoChamp =
        {
            "state": "",
            "champs": [
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
                //no role : C'est une option pour l'API.
            ]
        };

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
            "password":["isDefined", "minLength:8"],
            "avatar":[],
            "name":[]
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


    public formatRequestDataForDocument(requestData:any):any {
        return {
            nom: requestData.nom,
            prenom: requestData.prenom,
            surnom: requestData.surnom,
            description: requestData.description
        } as PersonneSchema;
    }


    /** ----- */
/*
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
        return User.connection !== undefined &&
            User.connection !== null;
    }

    public static providerIsSetup():boolean
    {
        return User.provider !== undefined &&
            User.provider !== null &&
            User.provider.connection !== undefined;
    }
*/

    public dataTransfertObject(document: any) {
        return {
            username: document.username,
            avatar: document.avatar,
            name: document.name,
        }
    }

}

import mongoose from "mongoose";
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


    /** @static infoChamp pour le retour frontend des champs à créer et règles des attributs de personne selon la route */
    static infoChamp =
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
                "label": "Courriel",
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
                "label": "Avatar",
                "type": "String",
                "rules": []
            },
            {
                "name": "name",
                "label": "Nom",
                "type": "String",
                "rules": []
            },
            {
                "name": "role",
                "label": "Rôle",
                "type": "String",
                "rules": []
            }
        ]
    };

    /** @static ruleSet pour la validation du data de personne */
    static ruleSet:any = {
        "default":{
            "id":["idValid"],
            "username":["isString"],
            "email":["isString"],
            "password":["isString"],
            "avatar":["isString"],
            "name":["isString"],
            "role":["isString"]
        },
        "create":{
            "username":["isDefined", "minLength:2"],
            "email":["isDefined", "minLength:2"],
            "password":["isDefined","minLength:2"],
        },
        "update":{
            "id":["isDefined"]
        },
        "delete":{
            "id":["isDefined"]
        }
    }

    /** 
     * @static @method concatRuleSet
     * @return Combinaison du ruleSet default et celui spécifié
     */
    static concatRuleSet(state:any){
        const concatRule:any = {};
            for (const field in this.ruleSet.default){

                //Si le field existe dans le ruleSet[state]
                if(Object.keys(this.ruleSet[state]).indexOf(field) != -1){
                    concatRule[field] = [
                        ...this.ruleSet[state][field],
                        ...this.ruleSet.default[field]
                    ];
                }
                //Sinon insérer seulement les règles par défaut.
                else {
                    concatRule[field] = [...this.ruleSet.default[field]];
                }
            }
            //LogHelper.debug("Object concatRule",concatRule);
            return concatRule;
    }


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

}
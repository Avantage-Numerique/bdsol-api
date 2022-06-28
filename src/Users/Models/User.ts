
import mongoose, {Schema} from "mongoose";
import type {DbProvider} from "../../Database/DatabaseDomain";
import {UserContract} from "../Contracts/UserContract";
import AbstractModel from "../../Abstract/Model";
import {PersonneSchema} from "../../Personnes/Schemas/PersonneSchema";
import {PasswordsController} from "../../Authentification/Controllers/PasswordsController";


/**
 * Model User
 */
export class User extends AbstractModel
{

    //  Singleton.
    protected static _instance:User;

    public static getInstance():User
    {
        if (User._instance === undefined) {
            User._instance = new User();
            User._instance.initSchema();
            User._instance.registerPreEvents();
        }
        return User._instance;
    }

    constructor() {
        super();
    }

    /**
     * @public
     * The model name.
     */
    modelName:string = 'User';

    /**
     * @public
     * Nom de la collection dans la base de donnée
     */
    collectionName:string = 'users';

    /**
     * @public
     * Connection mongoose
     */
    connection:mongoose.Connection;

    /**
     * @public
     * The provider for this model.
     */
    provider:DbProvider;

    /**
     * @public
     * The mongoose Model of this API Model.
     */
    mongooseModel:mongoose.Model<any>;


    /**
     * @public
     * Schema Mongoose for the User.
     * */
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


    /**
     * @public
     * infoChamp pour le retour frontend des champs à créer et règles des attributs de personne selon la route
     * */
    infoChamp = {
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

    /**
     * @public
     * The ruleSet of this model validation.
     */
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

    /**
     * Format the date before validation
     * @param requestData
     */
    public formatRequestDataForDocument(requestData:any):any {
        return {
            nom: requestData.nom,
            prenom: requestData.prenom,
            surnom: requestData.surnom,
            description: requestData.description
        } as PersonneSchema;
    }

    /**
     * Format the date for the return on public routes.
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


    public async registerPreEvents()
    {
        if (this.schema !== undefined)
        {
            // CREATE users, we hash the password.
            await this.schema.pre('save', async function (next: any): Promise<any>
            {
                const user: any = this;
                if (!user.isModified('password')) {
                    return next();
                }
                try {
                    user.password = await PasswordsController.hash(user.password);
                } catch (error: any) {
                    throw error;
                }
                return next();
            });
        }
    }

}
import mongoose from "mongoose";
import {Schema} from "mongoose";
import {OrganisationSchema} from "../Schemas/OrganisationSchema";
import {DbProvider, DataProvider} from "../../Database/DatabaseDomain";


class Organisation {

    /** @static Nom du modèle */
    static modelName: string = "Organisation";

    /** @static Nom de la collection dans la base de données */
    static collectionName: string = 'organisations';

    /** @static Connection mongoose */
    static connection: mongoose.Connection;

    /** @static Provider */
    static provider: DbProvider;

    /** @static Schéma pour la base de donnée */
    static schema: Schema =
        new Schema<OrganisationSchema>({
                nom: {type: String, required: true},
                description: String,
                url: String, //String? TODO
                contactPoint: String //String? TODO
            },
            {
                timestamps: true
            });
    
    /** @static infoChamp pour le retour frontend des champs à créer et règles des attributs d'organisation selon la route */
    static infoChamp =
    {
        "state": "",
        "champs": [
            {
                "name": "nom",
                "label": "Nom",
                "type": "String",
                "repeatable": false,
                "default": "", 
                "placeholder": "",
                "options": [],    
                "dataFetchingAddress": "",
                //"rules": []
            },
            {
                "name": "description",
                "label": "Description",
                "type": "String",
                "repeatable": false,
                "default": "", 
                "placeholder": "",
                "options": [],    
                "dataFetchingAddress": "",
                //"rules": []
            },
            {
                "name": "url",
                "label": "Site internet",
                "type": "String",
                "repeatable": false,
                "default": "", 
                "placeholder": "",
                "options": [],    
                "dataFetchingAddress": "",
                //"rules": []
            },
            {
                "name": "contactPoint",
                "label": "Point de contact",
                "type": "String",
                "repeatable": false,
                "default": "", 
                "placeholder": "",
                "options": [],    
                "dataFetchingAddress": "",
                //"rules": []
            }
        ]
    };
    
    /** @static ruleSet pour la validation du data de personne */
    static ruleSet = {
        "create":{
            "nom":["isDefined", "isString", "minLength:2"],
            "description":["isString"],
            "url":["isString"],
            "contactPoint":["isString"]
        },
        "update":{
            "id":["isDefined", "idValid"],
            "nom":["isString", "minLength:2"],
            "description":["isString"],
            "url":["isString"],
            "contactPoint":["isString"]
        },
        "search":{
            "id":["idValid"],
            "nom":["isString"],
            "description":["isString"],
            "url":["isString"],
            "contactPoint":["isString"]
        },
        "list":{
            "id":["idValid"],
            "nom":["isString"],
            "description":["isString"],
            "url":["isString"],
            "contactPoint":["isString"]
        },
        "delete":{
            "id":["isDefined", "idValid"],
        }
    }

    /**
     * @static method
     * @method initSchema
     */
    static initSchema() {
        if (Organisation.providerIsSetup()) {
            Organisation.provider.connection.model(Organisation.modelName, Organisation.schema);
        }
    }

    /**
     * @static method
     * @method getInstance
     */
    static getInstance() {
        Organisation.provider = DataProvider.getInstance();//must have
        if (Organisation.providerIsSetup()) {
            Organisation.initSchema();
            return Organisation.provider.connection.model(Organisation.modelName);
        }
        throw new Error("Organisation Provider is not setup. Can't get Organisation's model");
    }

    /**
     * @static method
     * @method providerIsSetup
     * @return {boolean} isSetup
     */
    static providerIsSetup(): boolean {
        return Organisation.provider !== undefined && Organisation.provider.connection !== undefined;
    }
}

export default Organisation;
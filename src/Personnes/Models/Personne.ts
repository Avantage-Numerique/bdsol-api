import mongoose from "mongoose";
import {Schema} from "mongoose"
import { PersonneSchema } from "../Schemas/PersonneSchema";
import type {DbProvider} from "../../Database/DatabaseDomain";
import AbstractModel from "../../Abstract/Model"


class Personne extends AbstractModel {

    //Singleton.
    protected static _instance:Personne;

    public static getInstance():Personne
    {
        if (Personne._instance === undefined) {
            Personne._instance = new Personne();
            Personne._instance.initSchema();
        }
        return Personne._instance;
    }

    /**
     * Nom du modèle
     * @public
     */
    modelName:string = 'Personne';

    /**
     * Nom de la collection dans la base de donnée
     * @public
     */
    collectionName:string = 'personnes';

    /**
     * The active connection to the mongoose/mongodb
     * @public Connection mongoose
     */
    connection:mongoose.Connection;

    provider:DbProvider;

    mongooseModel:mongoose.Model<any>;


    /** @public Schéma pour la base de donnée */
    schema:Schema =
        new Schema<PersonneSchema>({

            nom: { type: String, required: true },
            prenom: { type: String, required: true },
            surnom: String,
            description: String
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
                "name": "nom",
                "label": "Nom",
                "type": "String",
                "rules": []
            },
            {
                "name": "prenom",
                "label": "Prénom",
                "type": "String",
                "rules": []
            },
            {
                "name": "surnom",
                "label": "Surnom",
                "type": "String",
                "rules": []
            },
            {
                "name": "description",
                "label": "Description",
                "type": "String",
                "rules": []
            }
        ]
    };

    /** @static ruleSet pour la validation du data de personne */
    ruleSet:any = {
        "default":{
            "id":["idValid"],
            "nom":["isString"],
            "prenom":["isString"],
            "surnom":["isString"],
            "description":["isString"]
        },
        "create":{
            "nom":["isDefined", "minLength:2"],
            "prenom":["isDefined", "minLength:2"],
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
     * Get the field that are searchable.
     * @return {Object} the field slug/names.
     */
    get searchSearchableFields():object {
        //eturn {"nom":{},"prenom":{},"surnom":{},"description":{}};
        return ["nom", "prenom","surnom","description"];
    }

    /** 
     * @method formatRequestDataForDocument insère dans le schéma les données de la requête.
     *
     * @param {key:value} requestData - attributs de Personne
     * @return {PersonneSchema} l'interface Schéma contenant les données de la requête
     */
    public formatRequestDataForDocument(requestData:any):any {
        return {
            nom: requestData.nom,
            prenom: requestData.prenom,
            surnom: requestData.surnom,
            description: requestData.description
        } as PersonneSchema;
    }

    public dataTransfertObject(document: any) {
        return {
            nom: document.nom,
            prenom: document.prenom,
            surnom: document.surnom,
            description: document.description,
        }
    }
}
export default Personne;
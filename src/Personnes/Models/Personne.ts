import mongoose from "mongoose";
import {Schema} from "mongoose"
import { PersonneSchema } from "../Schemas/PersonneSchema";
import type {DbProvider} from "../../Database/DatabaseDomain";
import AbstractModel from "../../Abstract/Model"


class Personne extends AbstractModel {

    /** @protected @static Singleton instance */
    protected static _instance:Personne;

    /** @public @static Model singleton instance constructor */
    public static getInstance():Personne {
        if (Personne._instance === undefined) {
            Personne._instance = new Personne();
            Personne._instance.initSchema();
        }
        return Personne._instance;
    }

    /** @public Model name */
    modelName:string = 'Personne';

    /** @public Collection name in database*/
    collectionName:string = 'personnes';

    /** @public Connection mongoose */
    connection:mongoose.Connection;
    provider:DbProvider;
    mongooseModel:mongoose.Model<any>;

    /** @public Database schema */
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


    /** @public Used to return attributes and rules for each field of this entity. */
    fieldInfo =
    {
        "route": "",
        "field": [
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

    /** @public Rule set for every field of this entity for each route */
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
     * @get the field that are searchable.
     * @return {Object} the field slug/names.
     */
    get searchSearchableFields():object {
        return ["nom", "prenom","surnom","description"];
    }

    /**
     * @public @method formatRequestDataForDocument Format the data for this entity
     * @param {any} requestData - Data to format
     * @return {OrganisationSchema} The entity formated to schema
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
     * @public @method dataTransfertObject Format the document for the public return.
     * @param document
     * @return {any}
     */
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
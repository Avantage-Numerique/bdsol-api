import mongoose from "mongoose";
import {Schema} from "mongoose";
import {OrganisationSchema} from "../Schemas/OrganisationSchema";
import {DbProvider} from "../../Database/DatabaseDomain";
import AbstractModel from "../../Abstract/Model";

class Organisation extends AbstractModel {

    /** @protected @static Singleton instance of model Organisation */
    protected static _instance:Organisation;

    /** @public @static Model singleton instance constructor */
    public static getInstance():Organisation {
        if (Organisation._instance === undefined) {
            Organisation._instance = new Organisation();
            Organisation._instance.initSchema();
        }
        return Organisation._instance;
    }

    /** @public Model name */
    modelName: string = "Organisation";

    /** @public Collection name in database */
    collectionName: string = 'organisations';
    
    /** @public Connection mongoose */
    connection: mongoose.Connection;
    mongooseModel:mongoose.Model<any>;
    provider: DbProvider;

    /** @public Database schema */
    schema: Schema =
        new Schema<OrganisationSchema>({
                nom: {type: String, required: true},
                description: String,
                url: String, //String? TODO
                contactPoint: String, //String? TODO
                dateDeFondation: Date
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
                "name": "description",
                "label": "Description",
                "type": "String",
                "rules": []
            },
            {
                "name": "url",
                "label": "Site internet",
                "type": "String",
                "rules": []
            },
            {
                "name": "contactPoint",
                "label": "Point de contact",
                "type": "String",
                "rules": []
            },
            {
                "name": "dateDeFondation",
                "label": "Date de fondation",
                "type": "Date",
                "rules": []
            }
        ]
    };
    
    /** @public Rule set for every field of this entity for each route */
    ruleSet:any = {
        "default":{
            "id":["idValid"],
            "nom":["isString"],
            "description":["isString"],
            "url":["isString"],
            "contactPoint":["isString"],
            "dateDeFondation":["isDate"]
        },
        "create":{
            "nom":["isDefined", "minLength:2"],
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
        return ["nom", "description","url","contactPoint", "dateDeFondation"];
    }

    /**
     * @public @method formatRequestDataForDocument Format the data for this entity
     * @param {any} requestData - Data to format
     * @return {OrganisationSchema} The entity formated to schema
     */
     public formatRequestDataForDocument(requestData:any):any {
        return {
            nom: requestData.nom,
            description: requestData.description,
            url: requestData.url,
            contactPoint: requestData.contactPoint,
            dateDeFondation: requestData.dateDeFondation
        } as OrganisationSchema;
    }

    /**
     * @public @method dataTransfertObject Format the document for the public return.
     * @param document
     * @return {any}
     */
    public dataTransfertObject(document: any):any {
        return {
            nom: document.nom,
            description: document.description,
            url: document.url,
            contactPoint: document.contactPoint,
            dateDeFondation: document.dateDeFondation
        }
    }
}
export default Organisation;
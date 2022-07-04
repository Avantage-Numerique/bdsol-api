import mongoose from "mongoose";
import {Schema} from "mongoose"
import { TaxonomySchema } from "../Schemas/TaxonomySchema";
import type {DbProvider} from "../../Database/DatabaseDomain";
import AbstractModel from "../../Abstract/Model"

class Taxonomy extends AbstractModel {

    /** @protected @static Singleton instance of model Taxonomy */
    protected static _instance:Taxonomy;

    /** @public @static Model singleton instance constructor */
    public static getInstance():Taxonomy {
        if (Taxonomy._instance === undefined) {
            Taxonomy._instance = new Taxonomy();
            Taxonomy._instance.initSchema();
        }
        return Taxonomy._instance;
    }

    /** @public Model name */
    modelName:string = 'Taxonomy';

    /** @public Collection name in database */
    collectionName:string = 'taxonomy';

    /** @public Connection mongoose */
    connection:mongoose.Connection;
    provider:DbProvider;
    mongooseModel:mongoose.Model<any>;

    /** @public Database schema */
    schema:Schema =
        new Schema<TaxonomySchema>({

            nom: { type: String, required: true },
            description: String,
            subTaxonomy:String
        },
            {
                timestamps: true
        });


    /** @public Used to return attributes and rules for each field of this entity. */
    fieldInfo =
    {
        "state": "",
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
                "name": "subTaxonomy",
                "label": "Sous-Taxonomie lié",
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
            "description":["isString"],
            "subTaxonomy":["isString"]
        },
        "create":{
            "nom":["isDefined", "minLength:2"]
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
        return ["nom", "description", "subtaxonomy"];
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
            subTaxonomy: requestData.subTaxonomy
        } as TaxonomySchema;
    }

    /**
     * @public @method dataTransfertObject Format the document for the public return.
     * @param document
     * @return {any}
     */
    public dataTransfertObject(document: any) {
        return {
            nom: document.nom,
            description: document.description,
            subTaxonomy: document.subTaxonomy,
        }
    }
}
export default Taxonomy;
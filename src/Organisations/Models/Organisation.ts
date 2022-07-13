import mongoose from "mongoose";
import {Schema} from "mongoose";
import {OrganisationSchema} from "../Schemas/OrganisationSchema";
import {DbProvider} from "../../Database/DatabaseDomain";
import AbstractModel from "../../Abstract/Model";
import * as fs from 'fs';

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
                name: {type: String, required: true},
                description: String,
                url: String, //String? TODO
                contactPoint: String, //String? TODO
                fondationDate: Date
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
                "name": "name",
                "label": "name",
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
                "name": "fondationDate",
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
            "name":["isString"],
            "description":["isString"],
            "url":["isString"],
            "contactPoint":["isString"],
            "fondationDate":["isDate"]
        },
        "create":{
            "name":["isDefined", "minLength:2"],
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
        return ["name", "description","url","contactPoint", "fondationDate"];
    }

    /**
     * @public @method dataTransfertObject Format the document for the public return.
     * @param document
     * @return {any}
     */
    public dataTransfertObject(document: any):any {
        return {
            name: document.name,
            description: document.description,
            url: document.url,
            contactPoint: document.contactPoint,
            fondationDate: document.fondationDate
        }
    }

    public async documentation():Promise<any>{
        const response =  fs.readFileSync('/api/doc/Organisations.md', 'utf-8');
        return response;
   }
}
export default Organisation;
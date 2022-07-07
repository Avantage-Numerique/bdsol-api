import mongoose from "mongoose";
import {Schema} from "mongoose";
import { PersonneSchema } from "../Schemas/PersonneSchema";
import type {DbProvider} from "../../Database/DatabaseDomain";
import AbstractModel from "../../Abstract/Model";
import * as fs from 'fs';


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

    /** @public Model lastName */
    modelName:string = 'Personne';

    /** @public Collection lastName in database*/
    collectionName:string = 'personnes';

    /** @public Connection mongoose */
    connection:mongoose.Connection;
    provider:DbProvider;
    mongooseModel:mongoose.Model<any>;

    /** @public Database schema */
    schema:Schema =
        new Schema<PersonneSchema>({
            lastName: { type: String, required: true },
            firstName: { type: String, required: true },
            nickname: String,
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
                "name": "lastName",
                "label": "Nom ",
                "type": "String",
                "rules": []
            },
            {
                "name": "firstName",
                "label": "Prénom",
                "type": "String",
                "rules": []
            },
            {
                "name": "nickname",
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
            "lastName":["isString"],
            "firstName":["isString"],
            "nickname":["isString"],
            "description":["isString"]
        },
        "create":{
            "lastName":["isDefined", "minLength:2"],
            "firstName":["isDefined", "minLength:2"],
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
        return ["lastName", "firstName","nickname","description"];
    }

    /**
     * @public @method formatRequestDataForDocument Format the data for this entity
     * @param {any} requestData - Data to format
     * @return {OrganisationSchema} The entity formated to schema
     */
    public formatRequestDataForDocument(requestData:any):any {
        return {
            lastName: requestData.lastName,
            firstName: requestData.firstName,
            nickname: requestData.nickname,
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
            lastName: document.lastName,
            firstName: document.firstName,
            nickname: document.nickname,
            description: document.description,
        }
    }

    public async documentation():Promise<any>{
        const response =  fs.readFileSync('/api/doc/Personnes.md', 'utf-8');
        return response;
   }
}
export default Personne;
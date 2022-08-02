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
            lastName: {
                type: String,
                required: true,
                alias: 'nom'
            },
            firstName: {
                type: String,
                required: true,
                alias: 'prenom'
            },
            nickname: {
                type: String,
                alias: 'surnom'
            },
            description: String,
            occupation: {
                type: [mongoose.Types.ObjectId],
                default:undefined,
                ref: 'taxonomies'
            }
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
                "label": "Nom",
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
            },
            {
                "name": "occupation",
                "label": "Occupation",
                "type": "ObjectId",
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
        return ["lastName", "firstName","nickname","description", "occupation"];
    }

    /**
     * @public @method dataTransfertObject Format the document for the public return.
     * @todo faire une version qu'on a un objet adapté au document et non mandatoir sur toute les propriétés inscrite.
     * @param document
     * @return {any}
     */
    public dataTransfertObject(document: any) {
        return {
            lastName: document.lastName,
            firstName: document.firstName,
            nickname: document.nickname,
            description: document.description,
            occupation: document.occupation
        }
    }

    public async documentation():Promise<any>{
        return fs.readFileSync('/api/doc/Personnes.md', 'utf-8');
   }
}
export default Personne;
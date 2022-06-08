import mongoose from "mongoose";
import {Schema} from "mongoose"
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import { PersonneSchema } from "../Schemas/PersonneSchema";
import type {DbProvider} from "../../Database/DatabaseDomain";
import {DataProvider} from "../../Database/DatabaseDomain";
import AbstractModel from "../../Abstract/model"

class Personne extends AbstractModel {
    
    /** @public Nom du modèle */
    modelName:string = 'Personne';

    /** @public Nom de la collection dans la base de donnée */
    collectionName:string = 'personnes';

    /** @public Connection mongoose */
    connection:mongoose.Connection;

    provider:DbProvider;

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
            "surnom":[],
            "description":[]
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

    get searchSearchableFields():object {
        //eturn {"nom":{},"prenom":{},"surnom":{},"description":{}};
        return ["nom", "prenom","surnom","description"];
    }
}
export default Personne;
import mongoose from "mongoose";
import {Schema} from "mongoose"
import { OccupationSchema } from "../Schemas/OccupationsSchema";
import type {DbProvider} from "../../../Database/DatabaseDomain";
import AbstractModel from "../../../Abstract/Model"

class Occupation extends AbstractModel {

    /** @public Nom du modèle */
    modelName:string = 'Occupation';

    /** @public Nom de la collection dans la base de donnée */
    collectionName:string = 'taxo-occupations';

    /** @public Connection mongoose */
    connection:mongoose.Connection;

    provider:DbProvider;

    /** @public Schéma pour la base de donnée */
    schema:Schema =
        new Schema<OccupationSchema>({

            nom: { type: String, required: true },
            description: String,
            sousTaxonomie:String
        },
            {
                timestamps: true
        });


    /** @static infoChamp pour le retour frontend des champs à créer et règles des attributs de occupation selon la route */
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
                "name": "description",
                "label": "Description",
                "type": "String",
                "rules": []
            },
            {
                "name": "sousTaxonomie",
                "label": "Sous-Taxonomie lié",
                "type": "String",
                "rules": []
            }
        ]
    };

    /** @static ruleSet pour la validation du data d'occupation */
    ruleSet:any = {
        "default":{
            "id":["idValid"],
            "nom":["isString"],
            "description":["isString"],
            "sousTaxonomie":["isString"]
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

    get searchSearchableFields():object {
        return ["nom", "description", "sous-taxonomie"];
    }

    /** 
     * @method formatRequestDataForDocument insère dans le schéma les données de la requête.
     * 
     * Paramètres :
     *      @param {key:value} requestData - attributs de Occupation
     * 
     * Retourne :
     *      @return {PersonneSchema} l'interface Schéma contenant les données de la requête
     */
    public formatRequestDataForDocument(requestData:any):any {
        return {
            nom: requestData.nom,
            description: requestData.description,
            sousTaxonomie: requestData.sousTaxonomie
        } as OccupationSchema;
    }

}

export default Occupation;
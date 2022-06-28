import mongoose from "mongoose";
import {Schema} from "mongoose";
import {OrganisationSchema} from "../Schemas/OrganisationSchema";
import {DbProvider} from "../../Database/DatabaseDomain";
import AbstractModel from "../../Abstract/Model";

class Organisation extends AbstractModel {

    /** @public Nom du modèle */
    modelName: string = "Organisation";

    /** @public Nom de la collection dans la base de données */
    collectionName: string = 'organisations';

    /** @public Connection mongoose */
    connection: mongoose.Connection;

    /** @public Provider */
    provider: DbProvider;

    /** @public Schéma pour la base de donnée */
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
    
    /** @public infoChamp pour le retour frontend des champs à créer et règles des attributs d'organisation selon la route */
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
    
    /** @public ruleSet pour la validation du data de organisation */
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
     * @method formatRequestDataForDocument insère dans le schéma les données de la requête.
     * 
     * Paramètres :
     *      @param {key:value} requestData - attributs de l'organisation
     * 
     * Retourne :
     *      @return {OrganisationSchema} l'interface Schéma contenant les données de la requête
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

}

export default Organisation;
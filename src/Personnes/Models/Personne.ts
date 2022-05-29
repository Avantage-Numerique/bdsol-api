import mongoose from "mongoose";
import {Schema} from "mongoose"
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import { PersonneSchema } from "../Schemas/PersonneSchema";
import type {DbProvider} from "../../Database/DatabaseDomain";
import {DataProvider} from "../../Database/DatabaseDomain";
import Rules from "../../Validation/Rules"

class Personne {
    
    /** @static Nom du modèle */
    static modelName:string = 'Personne';

    /** @static Nom de la collection dans la base de donnée */
    static collectionName:string = 'personnes';

    /** @static Connection mongoose */
    static connection:mongoose.Connection;

    static provider:DbProvider;

    /** @static Schéma pour la base de donnée */
    static schema:Schema =
        new Schema<PersonneSchema>({

            nom: { type: String, required: true },
            prenom: { type: String, required: true },
            surnom: String,
            description: String
        },
            {
                timestamps: true
        });

    /** @static ruleSet pour la validation du data de personne */
    static ruleSet = {
        "info":{
            /*data {
                champs = [
                    {
                        "name": "nom",
                        "label": "Nom",
                        "type": "string",//Rich? //Longtext ?
                        "reapeatable": true,
                        "rules": ["required", "notEmpty", "notNull", "notUndefined"]
                    }
                ]
            }*/

        },
        "create":{
            "nom":["isDefined", "isString", "minLength:2"],
            "prenom":["isDefined", "isString", "minLength:2"],
            "surnom":["isString"],
            "description":["isString"]
        },
        "update":{
            "id":["isDefined", "idValid"],
            "nom":["isString"],
            "prenom":["isString"],
            "surnom":["isString"],
            "description":["isString"]
        },
        "search":{
            "id":["idValid"],
            "nom":["isString"],
            "prenom":["isString"],
            "surnom":["isString"],
            "description":["isString"]
        },
        "list":{
            "id":["idValid"],
            "nom":["isString"],
            "prenom":["isString"],
            "surnom":["isString"],
            "description":["isString"]
        },
        "delete":{
            "id":["isDefined", "idValid"],
        }
    }

    
    /**
     * @method isNomOrPrenomValid Vérifie les conditions d'insertion dans la base de donnée d'un nom ou d'un prénom.
     * @param {string} nom - Nom ou prénom à valider
     * @return {boolean} isValid
     */
    static isNomOrPrenomValid(nom:string):boolean {
        return (nom.length >= 2);//nom will always be a string selon mon IDE : typeof nom === "string" &&
    }

    /**
     * @static method
     * @method initSchema
     */
    static initSchema() {
        if (Personne.providerIsSetup()) {
            Personne.provider.connection.model(Personne.modelName, Personne.schema);
        }
    }

    /**
     * @static Method
     * @method getInstance
     * @return model
     */
    static getInstance() {
        Personne.provider = DataProvider.getInstance();//must have
        if (Personne.providerIsSetup()) {
            Personne.initSchema();
            return Personne.provider.connection.model(Personne.modelName);
        }
        LogHelper.error("Personne Provider is not setup. Can't get Personne's model",
            Personne.provider,
            typeof Personne.provider,
            Personne.provider.connection,
            typeof Personne.provider.connection
        );
        throw new Error("Personne Provider is not setup. Can't get Personne's model");
    }

    /**
     * @static method
     * @method providerIsSetup
     * @return {boolean} isSetup
     */
    static providerIsSetup():boolean {
        return Personne.provider !== undefined && Personne.provider.connection !== undefined;
    }

    get searchSearchableFields():object {
        //eturn {"nom":{},"prenom":{},"surnom":{},"description":{}};
        return ["nom", "prenom","surnom","description"];
    }
}
export default Personne;
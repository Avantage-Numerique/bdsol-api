import mongoose from "mongoose";
import {Schema} from "mongoose"
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import { PersonneSchema } from "../Schemas/PersonneSchema";
import type {DbProvider} from "../../Database/DatabaseDomain";
import {DataProvider} from "../../Database/DatabaseDomain";

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

    /** @static infoChamp pour le retour frontend des champs à créer et règles des attributs de personne selon la route */
    static infoChamp =
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
    static ruleSet:any = {
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
     * @static @method concatRuleSet
     * @return Combinaison du ruleSet default et celui spécifié
     */
    static concatRuleSet(set:any){
        const concatRule:any = {};
            for (const field in this.ruleSet.default){

                //Si le field existe dans le ruleSet[state]
                if(Object.keys(this.ruleSet[set]).indexOf(field) != -1){
                    concatRule[field] = [
                        ...this.ruleSet[set][field],
                        ...this.ruleSet.default[field]
                    ];
                }
                //Sinon insérer seulement les règles par défaut.
                else {
                    concatRule[field] = [...this.ruleSet.default[field]];
                }
            }
            //LogHelper.debug("Object concatRule",concatRule);
            return concatRule;
    }

    /**
     * @static @method initSchema
     */
    static initSchema() {
        if (Personne.providerIsSetup()) {
            Personne.provider.connection.model(Personne.modelName, Personne.schema);
        }
    }

    /**
     * @static @method getInstance
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
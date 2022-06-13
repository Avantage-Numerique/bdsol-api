import mongoose from "mongoose";
import {Schema} from "mongoose";
import {OrganisationSchema} from "../Schemas/OrganisationSchema";
import {DbProvider, DataProvider} from "../../Database/DatabaseDomain";
import LogHelper from "../../Monitoring/Helpers/LogHelper";


class Organisation {

    /** @static Nom du modèle */
    static modelName: string = "Organisation";

    /** @static Nom de la collection dans la base de données */
    static collectionName: string = 'organisations';

    /** @static Connection mongoose */
    static connection: mongoose.Connection;

    /** @static Provider */
    static provider: DbProvider;

    /** @static Schéma pour la base de donnée */
    static schema: Schema =
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
    
    /** @static infoChamp pour le retour frontend des champs à créer et règles des attributs d'organisation selon la route */
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
    
    /** @static ruleSet pour la validation du data de personne */
    static ruleSet:any = {
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
     * @static @method concatRuleSet
     * @return Combinaison du ruleSet default et celui spécifié
     */
    static concatRuleSet(state:any){
        const concatRule:any = {};
        for (const field in this.ruleSet.default){

            //Si le field existe dans le ruleSet[state]
            if(Object.keys(this.ruleSet[state]).indexOf(field) != -1){
                concatRule[field] = [
                    ...this.ruleSet[state][field],
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
     * @static method
     * @method initSchema
     */
    static initSchema() {
        if (Organisation.providerIsSetup()) {
            Organisation.provider.connection.model(Organisation.modelName, Organisation.schema);
        }
    }

    /**
     * @static method
     * @method getInstance
     */
    static getInstance() {
        Organisation.provider = DataProvider.getInstance();//must have
        if (Organisation.providerIsSetup()) {
            Organisation.initSchema();
            return Organisation.provider.connection.model(Organisation.modelName);
        }
        throw new Error("Organisation Provider is not setup. Can't get Organisation's model");
    }

    /**
     * @static method
     * @method providerIsSetup
     * @return {boolean} isSetup
     */
    static providerIsSetup(): boolean {
        return Organisation.provider !== undefined && Organisation.provider.connection !== undefined;
    }
}

export default Organisation;
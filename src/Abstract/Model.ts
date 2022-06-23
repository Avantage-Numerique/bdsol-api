import {Schema} from "mongoose"
import mongoose from "mongoose";
import { DbProvider } from "../Database/DatabaseDomain";
import {DataProvider} from "../Database/DatabaseDomain";
import LogHelper from "../Monitoring/Helpers/LogHelper";


abstract class AbstractModel {

    abstract modelName:string;

    abstract collectionName:string;

    abstract connection:mongoose.Connection;
    abstract provider:DbProvider;
    abstract schema:Schema;

    abstract infoChamp:any;

    abstract ruleSet:any;

    public initSchema()
    {
        if (this.providerIsSetup()){
            this.provider.connection.model(this.modelName, this.schema);
        }
    }

    /**
     * @public @method getInstance
     * @return model
     */
    public getInstance()
    {
        this.provider = DataProvider.getInstance();//must have
        if (this.providerIsSetup()) {
            this.initSchema();
            return this.provider.connection.model(this.modelName);
        }
        LogHelper.error("this Provider is not setup. Can't get this's model",
            this.provider,
            typeof this.provider,
            this.provider.connection,
            typeof this.provider.connection
        );
        throw new Error("this Provider is not setup. Can't get this's model");
    }
    
    /**
     * @public @method providerIsSetup
     * @return {boolean} isSetup
    */
    public providerIsSetup():boolean
    {
        return this.provider !== undefined && this.provider.connection !== undefined;
    }
    
    //get searchSearchableFields():object {
    //    //eturn {"nom":{},"prenom":{},"surnom":{},"description":{}};
    //    return ["nom", "prenom","surnom","description"];
    //}

    /** 
     * @public @method RuleSet
     * @return Combinaison du ruleSet default et celui spécifié en string (ex :"create")
    */
    public RuleSet(route?:string)
    {
        //Si vide, renvoie les règles par défaut.
        if(route === undefined){
            return this.ruleSet.default;
        }
        
        const concatRule:any = {};
        for (const field in this.ruleSet.default){

            //Si le field existe dans le ruleSet[route]
            if(Object.keys(this.ruleSet[route]).indexOf(field) != -1){
                concatRule[field] = [
                    ...this.ruleSet[route][field],
                    ...this.ruleSet.default[field]
                ];
            }
            //Sinon insérer seulement les règles par défaut.
            else {
                concatRule[field] = [...this.ruleSet.default[field]];
            }
        }
        return concatRule;
    }

    abstract formatRequestDataForDocument(requestData:any):Document;

}

export default AbstractModel;
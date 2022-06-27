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
    abstract mongooseModel:mongoose.Model<any>;

    abstract infoChamp:any;

    abstract ruleSet:any;

    /**
     * @public @method getInstance
     * @return model
     */
    public connect()
    {
        //this.provider = DataProvider.getInstance();
        if (this.providerIsSetup() && this.connectionIsSetup())
        {
            this.initSchema();
            return this.mongooseModel = this.provider.connection.model(this.modelName);
        }

        LogHelper.error("this Provider is not setup. Can't get this's model",
            this.provider,
            typeof this.provider
        );
        /**
         * ,
         this.provider.connection,
         typeof this.provider.connection
         */
        throw new Error("this Provider is not setup. Can't get this's model");
    }


    public initSchema()
    {
        if (this.providerIsSetup() &&
            this.connectionIsSetup()){
            this.provider.connection.model(this.modelName, this.schema);
        }
    }


    /**
     * Setter the provider
     * @param provider
     */
    public setProvider(provider:DbProvider)
    {
        this.provider = provider;
    }


    /**
     * Return if the provider have a value.
     * @public @method providerIsSetup
     * @return {boolean} isSetup
    */
    public providerIsSetup():boolean
    {
        return this.provider !== undefined &&
            this.provider !== null;
    }

    /**
     * Check if the connection have a value in the model.
     * @return {boolean} if the connection have a valid value.
     */
    public connectionIsSetup():boolean
    {
        return this.connection !== undefined &&
            this.connection !== null;
    }


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
            if(Object.keys(this.ruleSet[route]).indexOf(field) != -1)
            {
                concatRule[field] = [
                    ...this.ruleSet[route][field],
                    ...this.ruleSet.default[field]
                ];
            }
            //Insert default Rules there.
            else
            {
                concatRule[field] = [...this.ruleSet.default[field]];
            }
        }
        return concatRule;
    }

    abstract formatRequestDataForDocument(requestData:any):Document;
    abstract dataTransfertObject(document: any):any;

}

export default AbstractModel;
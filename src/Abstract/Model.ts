import type {Connection, Model, Schema} from "mongoose"; //, mongoose
import {DbProvider, Service} from "../Database/DatabaseDomain";
import LogHelper from "../Monitoring/Helpers/LogHelper";

abstract class AbstractModel {
    
    //Can we do this and make it not static?
    //abstract getInstance():any;

    /** @abstract Model name. */
    abstract modelName:string;

    /** @abstract Collection name in database. */
    abstract collectionName:string;

    /**
     * The active connections to the mongoose/mongodb.
     * @abstract Connection mongoose.
     */
    abstract connection:Connection;
    abstract provider:DbProvider;
    abstract service:Service;
    abstract mongooseModel:Model<any>;
    
    /** @abstract Schema in the database. */
    abstract schema:Schema;

    /** @abstract Used to return attributes and rules for each field of this entity. */
    abstract fieldInfo:any;

    /** @abstract Set of rules that are verified for every field of this entity. */
    abstract ruleSet:any;

    /** @public @method connect Connect to database. */
    public connect()
    {
        if (this.providerIsSetup() && this.connectionIsSetup())
        {
            this.initSchema();
            return this.mongooseModel;// = this.provider.connection.model(this.modelName);
        }

        LogHelper.error(`${this.constructor.name}'s provider is not setup. Can't get the model`,
            this.provider,
            typeof this.provider
        );

        throw new Error(`${this.constructor.name}'s provider is not setup. Can't get the model`);
    }


    /** @public @method initSchema Associate the mongo Schema to the connection. */
    public initSchema():void
    {
        if (this.providerIsSetup() &&
            this.connectionIsSetup())
        {
            this.mongooseModel = this.provider.connection.model(this.modelName, this.schema);
            LogHelper.info(`Model init ${this.modelName} schema`, this.mongooseModel, " on conn. state : ", this.provider.connection.readyState);
        }
    }

    abstract registerIndexes():void;
    abstract dropIndexes():void;

    /**
     * @public @method providerIsSetup Return if the provider have a value.
     * @return {boolean} isSetup
    */
    public providerIsSetup():boolean
    {
        return this.provider !== undefined &&
            this.provider !== null;
    }

    /**
     * @public @method connectionIsSetup Check if the connection have a value in the model.
     * @return {boolean} if the connection have a valid value.
     */
    public connectionIsSetup():boolean
    {
        return this.connection !== undefined &&
            this.connection !== null;
    }

    /** 
     * @public @method RuleSet Combine default rules and route specific rules for each field of an entity.
     * @default emptyRoute : return the default rule set.
     * @return Combination of default and specified route rule set.
    */
    public RuleSet(route?:string)
    {
        //If route is undefined, return the default ruleset right away
        if(route === undefined)
            return this.ruleSet.default;
        
        const concatRule:any = {};
        for (const field in this.ruleSet.default) {
            //If the field exist in the Route's ruleSet. Don't double it. Or if default, don't double it.
            if(Object.keys(this.ruleSet[route]).indexOf(field) != -1 && route != "default")
            {
                concatRule[field] = [
                    ...this.ruleSet[route][field],
                    ...this.ruleSet.default[field]
                ];
            }
            //Insert default Rules there.
            else {
                concatRule[field] = [...this.ruleSet.default[field]];
            }
        }
        return concatRule;
    }

    /**
     * Get the field that are searchable.
     * @return {Object} the field slug/names.
     */
     abstract get searchSearchableFields():object;

    /**
     * @abstract @method dataTransfertObject Format the document for the public return.
     * @param document
     * @return {any} Most of the time it's a simple Object.
     */
    abstract dataTransfertObject(document: any):any;

    abstract documentation():Promise<any>;

}
export default AbstractModel;
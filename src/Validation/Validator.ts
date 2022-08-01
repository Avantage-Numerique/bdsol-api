import * as Rules from "./Rules";
//add isValid - contract to limit used
// Check if this is overkill

//Implementation
// I think I'll use the chain of responsability design https://refactoring.guru/design-patterns/chain-of-responsibility/typescript/example
//Needs :
// - For validating query in Routes
// - For validating raw query after a routes endpoint is called.
// - will need to santize before.

//@todo add an Abstrack Handler for Validor to extends from.
// Implement set the Rules contract to be the handle ?

// See this package instead ? https://joi.dev/api/?v=17.6.0
/**
 * Permet de chainer les validation comme ça. Ça pourrait être nice pour appliquer les rules qu'On va envoyer.
 * username: Joi.string()
 .alphanum()
 .min(3)
 .max(30)
 .required(),
 */


export default class Validator {

    //Instantiate de rules handler
    public isdefined = new Rules.isDefined();
    private isnotnull = new Rules.isNotNull();
    private isstring = new Rules.isString();
    private isnotempty = new Rules.isNotEmpty();
    private minlenght = new Rules.minLength();
    private maxlength = new Rules.maxLength();
    private idvalid = new Rules.idValid();
    private isobject = new Rules.isObject();
    private objectnotempty = new Rules.objectNotEmpty();
    private isdate = new Rules.isDate();


    /** 
     * @method validateData Validate data against a rule set
     * @note   if a rule is followed by ":" the next thing is a parameter to pass to the method
     * @note   if fields to validate contains "gte:" or "lte:" in their beginning, values will be evaluated without it.
     * @param {any} data - Value to validate : { "nom" : "Audet" }
     * @param {any} ruleSet - set of rule to check for each field: { "nom":["isDefined", "isSet" ...], "prenom":[...] }
     * @param {boolean} emptyOk - when false, Return error if object is empty 
     * @note ruleSet is in entity model
     * @return {object} - { isValid, message } :
     * @desc isValid (boolean): Passed the ruleSet or not.
     * @desc message (string) : Error or success message 
     */
    public validateData(data:any, ruleSet:any, emptyOk:boolean=false){
        this.isdefined
        .setNext(this.isnotnull)
        .setNext(this.isstring)
        .setNext(this.isnotempty)
        .setNext(this.minlenght)
        .setNext(this.maxlength)
        .setNext(this.idvalid)
        .setNext(this.isobject)
        .setNext(this.objectnotempty)
        .setNext(this.isdate);

        //in (key) / of (value)
        //Warning : "for in" not neccesarily proceed in order
        let isValid = true;
        let message = "Erreurs : ";
        let rule;

        //Object empty check
        if(emptyOk === false) {
            if (data == undefined || typeof data != 'object' || Object.entries(data).length == 0){
                message += "\n L'objet à valider est vide.";
                isValid = false;
                return { isValid, message };
            }
        }

        //Structure : "nom":["isDefined", ...]
        //For each field in ruleSet ("nom"...)
        for (const field in ruleSet) {
            //For each rule of those field ("isDefined"...)
            for (rule of ruleSet[field]) { //do we instead => validate(data[field], ruleSet[field].pop())
                //Set data to validate
                let dataField = data[field];

                //Remove (gte, lte) operator if needed (those are for QueryBuilder)
                if(dataField !== undefined){
                    if (dataField.toString().indexOf("gte:") == 0 || dataField.toString().indexOf("lte:") == 0){
                        dataField = dataField.toString().substring(4, dataField.toString().length);
                    }
                }

                let param = -1;
                //If param is passed
                if ( rule.indexOf(":") != -1) {
                    //ex: minLenght:3  => param = 3, rule = minLength
                    param = rule.substring(rule.indexOf(":")+1, rule.length);
                    rule = rule.substring(0, rule.indexOf(":"));
                }
                
                //Verify rule if data is there |OR| if data is not but should be (isDefined) 
                if((dataField !== undefined && typeof dataField !== 'undefined') ||
                    ((dataField == undefined || typeof dataField == 'undefined') && ruleSet[field].includes("isDefined"))){

                    const ruleMsg = this.isdefined.handle(rule, dataField, param);
                    if (ruleMsg != "OK") {
                        message += ruleMsg;
                        isValid = false;
                    }
                }
            }
        }
        if (isValid)
            message = "OK";
        
        return { isValid, message };
    }

}
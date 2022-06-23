
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
     * @method validateData Valide le data contre un ensemble de règle
     * @note   si la règle demande un paramètre on ajoute un ":" suivi du paramètre
     * @note   si le champs à valider contient les opérateurs "gte:" ou "lte:", les valeurs seront validées sans les opérateurs.
     * 
     * Paramètres :
     *      @param {key:value} data - Valeur à valider contre le schéma : { "nom" : "Audet" }
     *      @param {key:value[]} ruleSet - Ensemble de règle pour chaque valeur à vérifier: { "nom":["isDefined", "isSet" ...], "prenom":[...] }
     *      @param {boolean} emptyOk - Demande ou non la vérification à savoir si l'objet passé est vide
     *      @note ruleSet se trouve en général dans le model de l'entité
     * 
     * Retourne :
     *      @return {object} - { isValid, message } :
     *          @desc isValid (boolean): représentant si les données sont validée
     *          @desc message (string) : décrivant l'échec ou réussite de la validation 
     */
    public validateData(data:any, ruleSet:any, emptyOk:boolean=false){
        this.isdefined.setNext(this.isnotnull).setNext(this.isstring).setNext(this.isnotempty).setNext(this.minlenght)
        .setNext(this.maxlength).setNext(this.idvalid).setNext(this.isobject).setNext(this.objectnotempty).setNext(this.isdate);
        //in (key) / of (value)
        //Warning : "for in" n'effectue pas nécessairement dans l'ordre
        let isValid = true;
        let message = "Erreurs : ";
        let rule;

        //Si l'objet ne peut pas être vide
        if(emptyOk === false) {
            if (data == undefined || typeof data != 'object' || Object.entries(data).length == 0){
                message += "\n L'objet à valider est vide.";
                isValid = false;
                return { isValid, message };
            }
        }

        //Structure : "nom":["isDefined", ...]
        //Pour chaque champs dans ruleSet ("nom"...)
        for (const field in ruleSet) {
            //Pour chaque règles du champs ("isDefined"...)
            for (rule of ruleSet[field]) { //do we instead => validate(data[field], ruleSet[field].pop())
                //Set data to validate
                let dataField = data[field];

                //Remove (gte, lte) operator if needed (those are for QueryBuilder)
                //NE FONCTIONNE PAS PRÉSENTEMENT AVEC LES NOMBRES PUISQUE JE CONVERTIS LES NOMBRES EN STRING!
                if(dataField !== undefined){
                    if (dataField.toString().indexOf("gte:") == 0 || dataField.toString().indexOf("lte:") == 0){
                        dataField = dataField.toString().substring(4, dataField.toString().length);
                    }
                }

                let param = -1;
                //Si paramètre à passer
                if ( rule.indexOf(":") != -1) {
                    //ex: minLenght:3  => param = 3, rule = minLength
                    param = rule.substring(rule.indexOf(":")+1, rule.length);
                    rule = rule.substring(0, rule.indexOf(":"));
                  }
                
                //Vérifier les règles si la donnée est là |OU| si la donnée est pas là mais devrait l'être (isDefined) 
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
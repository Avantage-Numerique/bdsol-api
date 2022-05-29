import Rules from "./Rules"
import LogHelper from "../Monitoring/Helpers/LogHelper";

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

    /** 
     * @method validateData Valide le data contre un ensemble de règle 
     * 
     * Paramètres :
     *      @param {key:value} data - Valeur à valider contre le schéma : { "nom" : "Audet" }
     *      @param {key:value[]} ruleSet - Ensemble de règle pour chaque valeur à vérifier: { "nom":["isDefined", "isSet" ...], "prenom":[...] }
     *      @note ruleSet se trouve en général dans le model de l'entité
     * 
     * Retourne :
     *      @return {object} - { isValid, message } :
     *          @desc isValid (boolean): représentant si les données sont validée
     *          @desc message (string) : décrivant l'échec ou réussite de la validation 
     */
    static validateData(data:any, ruleSet:any){
        //in (key) / of (value)
        //Warning : for in n'effectue pas nécessairement dans l'ordre
        let isValid = true;
        let message = "Erreurs : ";
        let rule;
        for (const field in ruleSet) {
            for (rule of ruleSet[field]) { //do we instead => validate(data[field], ruleSet[field].pop())
                LogHelper.debug("Dans les 2 for loop avec field : "+field+ " et rule : "+rule);

                let param = -1;
                //Si paramètre à passer
                if ( rule.indexOf(":") != -1) {
                    LogHelper.debug("dans indexOf(':')");
                    //ex: minLenght:3  => param = 3, rule = minLength
                    param = rule.substring(rule.indexOf(":")+1, rule.length);
                    rule = rule.substring(0, rule.indexOf(":"));
                  }
                
                switch (rule){
                case "isDefined" :
                    if ( !Rules.isDefined(data[field]) ){
                        isValid = false;
                        message += "\n"+data[field]+" => "+Rules.ruleErrorMsg.isDefined;
                    } break;
                case "isNotNull" :
                    if ( !Rules.isNotNull(data[field]) ){
                        isValid = false;
                        message += "\n"+data[field]+" => "+Rules.ruleErrorMsg.isNotNull;
                    } break;
                case "isString" :
                    if ( !Rules.isString(data[field]) ){
                        isValid = false;
                        message += "\n"+data[field]+" => "+Rules.ruleErrorMsg.isString;
                    } break;
                case "isNotEmpty" :
                    if ( !Rules.isNotEmpty(data[field]) ){
                        isValid = false;
                        message += "\n"+data[field]+" => "+Rules.ruleErrorMsg.isNotEmpty;
                    } break;
                case "minLength" :
                    if ( !Rules.minLength(data[field], param) ){
                        isValid = false;
                        message += "\n"+data[field]+" => "+Rules.ruleErrorMsg.minLength;
                    } break;
                case "maxLength" :
                    if ( !Rules.maxLength(data[field], param) ){
                        isValid = false;
                        message += "\n"+data[field]+" => "+Rules.ruleErrorMsg.maxLength;
                    } break;
                case "idValid" :
                    if ( !Rules.idValid(data[field])){
                        isValid = false;
                        message += "\n"+data[field]+" => "+Rules.ruleErrorMsg.idValid;
                    } break;
                case "isObject" :
                    if ( !Rules.isObject(data[field])){
                        isValid = false;
                        message += "\n"+data[field]+" => "+Rules.ruleErrorMsg.isObject;
                    } break;
                default:
                    LogHelper.debug("Validator.validate : La règle "+rule+ "n'est pas implémentée.");
                    isValid = false;
                    message += "\nLa règle "+rule+ "n'est pas implémentée."; break;
                    
                }
                /*
                //Si la règle existe
                if(Rules[rule]() != undefined){
                    LogHelper.debug("Entré dans si la regle existe");
                    //Si param est défini, appel fonction avec param
                    if ( param != -1){
                        if (!Rules[rule](data[field], param)){
                            //Si la valeur n'est pas valide
                            isValid = false;
                            message += "\n"+Rules.ruleErrorMsg[rule];
                        }
                    }
                    //Si param non défini, appel fonction sans param
                    else{
                        if ( !Rules[rule](data[field]) ) {
                            //Si la valeur n'est pas valide
                            isValid = false;
                            message += "\n"+Rules.ruleErrorMsg[rule];
                        }
                    }
                }
                else {
                    LogHelper.debug("Validator.validate : La règle "+rule+ "n'est pas implémentée.");
                    isValid = false;
                    message += "\nLa règle "+rule+ "n'est pas implémentée.";
                }*/
            }
        }
        if (isValid)
            message = "Ok";
        
        return { isValid, message };
    }

}

//"Nom" : ["notEmpty", "notNull", "notUndefined"]//Rules


/*
const
    //(response).
    data {
        champs = [
            {
                "name": "nom",
                "label": "Nom",
                "type": "string",//Rich? //Longtext ?
                "reapeatable": true,
                "rules": ["required", "notEmpty", "notNull", "notUndefined"]
            }
        ]
    }
};*/

/*
//Dans la classe Personne:
static validatorSchema =
    {
        "variables":["nom", "prenom", "surnom", "description"],
        "notEmpty":["nom","prenom"],
        "isSet":["nom","prenom"],
        "notNull":["nom","prenom"],
        "notUndefined":["nom","prenom"],
        "minLenght":[{"nom":"2"},{"prenom":"2"}],
        "comporte 3 voyelle":[],
        "autre règle quelconque":[]
    }

//Dans la classe validator
class Validator {
    constructor(){};
    static Validator(collection:string, requestData:any)
    {
        let validSchema;
        switch(collection){
            case "personnes":
                validSchema = Personne.validatorSchema; break;
            case "users":
                validSchema = Users.validatorSchema; break;
            default: validSchema = null;
        }
        if(validSchema === null)
            return;//erreur pas de schéma

        //rules
        let isValid = true;
        let message = "";
        message += Validator.notEmpty(validSchema.variables, validSchema.notEmpty, requestData)
        message += Validator.isSet(validSchema.isSet, requestData)

        //Si il y a un message, alors pas valide.
        if(message !== "")
            isValid = false;

        return {message, isValid};
    }
    private notEmpty(variables:any, schema:any, data:any):string
    {
        //Exemple :    schema= {"notEmpty":["nom","prenom"]}

        //For each element in schema (schema = "notEmpty":[nom, prénom]),
            //si requestData.(variables[0,1,2,3....]) contient l'élément (notEmpty => [nom, prenom])
                //faire la vérif notEmpty sur l'élément
                    //si erreur, message += l'élément est fautif
        //return message;
    }
}
 */
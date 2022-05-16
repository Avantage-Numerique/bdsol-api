
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


export default class Validator {

    public static validate(data:any, rules:any):boolean
    {
        let isValid = false;

        for (let property in data)
        {
            for (let rule in rules[property])
            {
                //check if the data[property] rule applied
                //rules must be set
                //rules definition ?
                // Sets rule from the the Model.schema
                //isValid = isValid ?? Rules[rule].validate();
            }
        }

        return isValid;
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
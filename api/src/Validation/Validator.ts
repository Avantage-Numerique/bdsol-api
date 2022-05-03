
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
            }
        }

        return isValid;
    }

}
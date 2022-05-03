
//add isValid - contract to limit used
// Check if this is overkill
//

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
            }
        }

        return isValid;
    }

}
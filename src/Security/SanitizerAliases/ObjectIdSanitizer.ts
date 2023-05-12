import {IsObjectIdStringValid} from "../Validators/IsObjectidValidator";
import {ObjectIdStringSanitizer} from "../Sanitizers/ObjectIdStringSanitizer";
import {body} from "express-validator";
import {ValidationChain} from "express-validator/src/chain/validation-chain";

/**
 * Optionnal check if the element is set, and if it's an ObjectID.
 * @param param {string}
 * @param isOptional {boolean}
 * @param source {any} it's a param to change from body to params
 */
const isObjectId = (param:string, isOptional:boolean=true, source=body):ValidationChain => {

    let chain:ValidationChain = source(param);

    if (isOptional) {
        chain = chain.exists({checkFalsy:true}).bail();
    }
    if (!isOptional) {
        chain = chain.notEmpty();
    }

    return chain
        .custom(IsObjectIdStringValid.validatorCustom())
        .customSanitizer(ObjectIdStringSanitizer.validatorCustomSanitizer())
}

export {isObjectId}
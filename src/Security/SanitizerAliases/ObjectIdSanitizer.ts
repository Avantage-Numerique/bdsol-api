import {IsObjectIdStringValid} from "../Validators/IsObjectidValidator";
import {ObjectIdStringSanitizer} from "../Sanitizers/ObjectIdStringSanitizer";
import {body} from "express-validator";
import {ApiValidatingSanitizingChainType} from "../ExpressValidator/ApiValidatingSanitizingChain";

/**
 * Optionnal check if the element is set, and if it's an ObjectID.
 * @param param {string}
 * @param isOptional {boolean}
 * @param source {any} it's a param to change from body to params
 */
const isObjectId = (param:string, isOptional:boolean=true, source=body):ApiValidatingSanitizingChainType => {

    let chain:ApiValidatingSanitizingChainType = source(param);
    chain = chain.optional({values:"falsy"})

    if (!isOptional) {
        chain = chain.notEmpty().withMessage("Is required");
    }

    return chain
        .custom(IsObjectIdStringValid.validatorCustom())
        .withMessage(`${(isOptional ? "Optional" : "Required")} Isn't a valid objectID`)
        .customSanitizer(ObjectIdStringSanitizer.validatorCustomSanitizer())
}

export {isObjectId}
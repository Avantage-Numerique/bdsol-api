import {body} from "express-validator";
import {ValidationChain} from "express-validator/src/chain/validation-chain";
import {NoHtmlSanitizer} from "../Sanitizers/NoHtmlSanitizer";

/**
 * Optionnal check if the element is set, and if it's an ObjectID.
 * @param param {string}
 * @param isOptional {boolean}
 * @param source {any} it's a param to change from body to params
 */
const noHtmlStringSanitizer = (param:string, isOptional:boolean=true, source=body):ValidationChain => {

    let baseChain:ValidationChain = source(param);
    let chain = baseChain.exists({checkFalsy:true}).bail();

    if (!isOptional) {
        chain = baseChain.notEmpty();
    }

    return chain
        .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
        .stripLow()
        .trim()
}

export {noHtmlStringSanitizer}
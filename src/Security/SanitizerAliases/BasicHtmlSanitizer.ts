import {body} from "express-validator";
import {ValidationChain} from "express-validator/src/chain/validation-chain";
import {HtmlSanitizer} from "../Sanitizers/HtmlSanitizer";

/**
 * Optionnal check if the element is set, and if it's an ObjectID.
 * @param param {string}
 * @param isOptional {boolean}
 * @param source {any} it's a param to change from body to params
 */
const basicHtmlSanitizer = (param:string, isOptional:boolean=true, source=body):ValidationChain => {

    let baseChain:ValidationChain = source(param);
    let chain = baseChain.exists({checkFalsy:true}).bail();

    if (!isOptional) {
        chain = baseChain.notEmpty();
    }

    return chain
        .customSanitizer(HtmlSanitizer.validatorCustomSanitizer())
        .trim()
}

export {basicHtmlSanitizer}
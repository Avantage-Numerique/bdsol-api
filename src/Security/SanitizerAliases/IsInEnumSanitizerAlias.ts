import {body} from "express-validator";
import {ApiValidatingSanitizingChainType} from "../ExpressValidator/ApiValidatingSanitizingChain";
import {NoHtmlSanitizer} from "../Sanitizers/NoHtmlSanitizer";
import {EnumSanitizer} from "../Sanitizers/EnumSanitizer";

/**
 * Optionnal check if the element is set, and if it's an ObjectID.
 * @param param {string}
 * @param targetEnum {any}
 * @param isRequired {boolean}
 * @param source {any} it's a param to change from body to params
 */
const isInEnumSanitizerAlias = (param:string, targetEnum:any, isRequired:boolean=false, source=body):ApiValidatingSanitizingChainType => {

    let chain:ApiValidatingSanitizingChainType = source(param);
    chain = chain.optional({values:"falsy"})

    if (isRequired) {
        chain = chain.notEmpty().withMessage("Is required");
    }

    return chain
        .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
        .customSanitizer(EnumSanitizer.validatorCustomSanitizer(targetEnum))
        .stripLow()
        .trim();
}

export {isInEnumSanitizerAlias}
import {body} from "express-validator";
import {HtmlSanitizer} from "../Sanitizers/HtmlSanitizer";
import {ApiValidatingSanitizingChainType} from "../ExpressValidator/ApiValidatingSanitizingChain";

/**
 * Optionnal check if the element is set, and if it's an ObjectID.
 * @param param {string}
 * @param isOptional {boolean}
 * @param source {any} it's a param to change from body to params
 */
const basicHtmlSanitizerAlias = (param:string, isOptional:boolean=true, source=body):ApiValidatingSanitizingChainType => {

    const baseChain:ApiValidatingSanitizingChainType = source(param);
    let chain = baseChain.optional({values:"falsy"});

    if (!isOptional) {
        chain = baseChain.notEmpty().withMessage("Is required");
    }

    return chain
        .customSanitizer(HtmlSanitizer.validatorCustomSanitizer())
        .trim()
}

export {basicHtmlSanitizerAlias};
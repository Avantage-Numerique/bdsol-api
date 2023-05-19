import {body} from "express-validator";
import {NoHtmlSanitizer} from "../Sanitizers/NoHtmlSanitizer";
import {ApiValidatingSanitizingChainType} from "../ExpressValidator/ApiValidatingSanitizingChain";

const entityNameSanitizerAlias = (param:string, isOptional:boolean=true, source=body):ApiValidatingSanitizingChainType => {

    let chain:ApiValidatingSanitizingChainType = source(param);
    chain = chain.optional({values:"falsy"})

    if (!isOptional) {
        chain = chain.notEmpty().withMessage("Is required");
    }

    const minLength:number = 2;
    chain = chain.isLength({min:minLength})
        .withMessage(`must be at least ${minLength} chars long`)
        .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
        .stripLow()
        .trim();

    return chain;
}

export {entityNameSanitizerAlias}
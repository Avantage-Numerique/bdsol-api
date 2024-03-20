import {body} from "express-validator";
import {NoHtmlSanitizer} from "../Sanitizers/NoHtmlSanitizer";
import {UrlSanitizer} from "../Sanitizers/UrlSanitizer";
import {ApiValidatingSanitizingChainType} from "../ExpressValidator/ApiValidatingSanitizingChain";

const urlSanitizerSearchAlias = (param:string, isOptional:boolean=true, source=body):ApiValidatingSanitizingChainType => {

    let chain:ApiValidatingSanitizingChainType = source(param);
    chain = chain.optional({values:"falsy"});

    if (!isOptional) {
        chain = chain.notEmpty().withMessage("Is required");
    }

    chain = chain.stripLow()
        .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
        //.customSanitizer(NoSpaceSanitizer.validatorCustomSanitizer())
        //.customSanitizer(NoAccentSanitizer.validatorCustomSanitizer())
        //.customSanitizer(LatinSanitizer.validatorCustomSanitizer())
        .trim()
        .customSanitizer(UrlSanitizer.validatorCustomSanitizer());

    return chain;
}

export {urlSanitizerSearchAlias}
import {body} from "express-validator";
import {NoHtmlSanitizer} from "../Sanitizers/NoHtmlSanitizer";
import {NoSpaceSanitizer} from "../Sanitizers/NoSpaceSanitizer";
import {NoAccentSanitizer} from "../Sanitizers/NoAccentSanitizer";
import {LatinSanitizer} from "../Sanitizers/LatinSanitizer";
import {UrlSanitizer} from "../Sanitizers/UrlSanitizer";
import {ApiValidatingSanitizingChainType} from "../ExpressValidator/ApiValidatingSanitizingChain";

const isURL = (param:string, isOptional:boolean=true, source=body):ApiValidatingSanitizingChainType => {

    let chain:ApiValidatingSanitizingChainType = source(param);
    chain = chain.optional({values:"falsy"});

    if (!isOptional) {
        chain = chain.notEmpty().withMessage("Is required");
    }

    chain = chain.stripLow()
        .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
        .customSanitizer(NoSpaceSanitizer.validatorCustomSanitizer())
        .customSanitizer(NoAccentSanitizer.validatorCustomSanitizer())
        .customSanitizer(LatinSanitizer.validatorCustomSanitizer())
        .trim()
        .customSanitizer(UrlSanitizer.validatorCustomSanitizer());

    return chain;
}

export {isURL}
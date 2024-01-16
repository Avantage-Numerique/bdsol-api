import {body} from "express-validator";
import {NoHtmlSanitizer} from "../Sanitizers/NoHtmlSanitizer";
import {LatinSanitizer} from "../Sanitizers/LatinSanitizer";
import {UrlSanitizer} from "../Sanitizers/UrlSanitizer";
import {ApiValidatingSanitizingChainType} from "../ExpressValidator/ApiValidatingSanitizingChain";
import {IntSanitizer} from "@src/Security/Sanitizers/IntSanitizer";

const IntegerSanitizerAlias = (param:string, isOptional:boolean=true, source=body):ApiValidatingSanitizingChainType => {

    let chain:ApiValidatingSanitizingChainType = source(param);
    chain = chain.optional({values:"falsy"});

    if (!isOptional) {
        chain = chain.notEmpty().withMessage("Is required");
    }

    chain = chain.stripLow()
        .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
        .customSanitizer(LatinSanitizer.validatorCustomSanitizer())
        .trim()
        .customSanitizer(UrlSanitizer.validatorCustomSanitizer())
        .customSanitizer(IntSanitizer.validatorCustomSanitizer());

    return chain;
}

export {IntegerSanitizerAlias}
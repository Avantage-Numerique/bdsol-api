import {body} from "express-validator";
import {ValidationChain} from "express-validator/src/chain/validation-chain";
import {NoHtmlSanitizer} from "../Sanitizers/NoHtmlSanitizer";
import {NoSpaceSanitizer} from "../Sanitizers/NoSpaceSanitizer";
import {NoAccentSanitizer} from "../Sanitizers/NoAccentSanitizer";
import {LatinSanitizer} from "../Sanitizers/LatinSanitizer";
import {UrlSanitizer} from "../Sanitizers/UrlSanitizer";

const isURL = (param:string, isOptional:boolean=true, source=body):ValidationChain => {

    let chain:ValidationChain = source(param);

    if (isOptional) {
        chain = chain.exists({checkFalsy:true}).bail();
    }
    if (!isOptional) {
        chain = chain.notEmpty();
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
import {body} from "express-validator";
import {NoHtmlSanitizer} from "../Sanitizers/NoHtmlSanitizer";
import {ApiValidatingSanitizingChainType} from "../ExpressValidator/ApiValidatingSanitizingChain";

const dateSanitizer = (param:string, isOptional:boolean=true, source=body):ApiValidatingSanitizingChainType => {

    let chain:ApiValidatingSanitizingChainType = source(param);
    chain = chain.optional({values:"falsy"})

    if (!isOptional) {
        chain = chain.notEmpty().withMessage("Is required");
    }

    chain = chain.customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
        .trim()
        //.isDate();

    return chain;
}

export {dateSanitizer}
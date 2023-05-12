import {body} from "express-validator";
import {ValidationChain} from "express-validator/src/chain/validation-chain";
import {NoHtmlSanitizer} from "../Sanitizers/NoHtmlSanitizer";

const EntityNameSanitizer = (param:string, isOptional:boolean=true, source=body):ValidationChain => {

    let chain:ValidationChain = source(param);

    if (isOptional) {
        chain = chain.exists({checkFalsy:true}).bail();
    }
    if (!isOptional) {
        chain = chain.notEmpty();
    }
    chain = chain.customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
        .stripLow()
        .trim();

    return chain;
}

export {EntityNameSanitizer}
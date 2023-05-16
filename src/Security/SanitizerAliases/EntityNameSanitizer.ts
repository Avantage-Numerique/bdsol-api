import {body} from "express-validator";
import {ValidationChain} from "express-validator/src/chain/validation-chain";
import {NoHtmlSanitizer} from "../Sanitizers/NoHtmlSanitizer";

import { ExpressValidator, CustomValidationChain, CustomSchema } from 'express-validator';

const entityAliasesChain = new ExpressValidator();
type entityAliasesChainType = CustomValidationChain<typeof entityAliasesChain>;

const EntityNameSanitizer = (): entityAliasesChainType => body('data.name').isLength({min:2}).withMessage('[EntityNameSanitizer] must be at least 2 chars long');

const EntityNameSanitizerChain = (param:string, isOptional:boolean=true, source=body):ValidationChain => {

    let chain:ValidationChain = source(param);

    if (isOptional) {
        chain = chain.exists({checkFalsy:true});
    }
    if (!isOptional) {
        chain = chain.notEmpty();
    }
    console.log("EntityNameSanitizer", param, isOptional, source);
    chain = chain.isLength({min:2}).withMessage('[EntityNameSanitizer] must be at least 2 chars long')
        .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
        .stripLow()
        .trim();

    return chain;
}

export {EntityNameSanitizer}
import { ExpressValidator, CustomValidationChain } from 'express-validator';

const ApiValidatingSanitizingChain = new ExpressValidator();
type ApiValidatingSanitizingChainType = CustomValidationChain<typeof ApiValidatingSanitizingChain>;


export {ApiValidatingSanitizingChain, ApiValidatingSanitizingChainType};
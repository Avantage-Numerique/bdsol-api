//import {CustomSanitizer} from "express-validator";
//import {UrlSanitizer} from "../Sanitizers/UrlSanitizer";
//import {NoHtmlSanitizer} from "../Sanitizers/NoHtmlSanitizer";
//import {NoSpaceSanitizer} from "../Sanitizers/NoSpaceSanitizer";
//import {NoAccentSanitizer} from "../Sanitizers/NoAccentSanitizer";
//import {LatinSanitizer} from "../Sanitizers/LatinSanitizer";


class NameSanitizing {

    public sanitize(raw:string):string {
        return raw;
    }

    public getSteps():Array<any> {
        return [
            /*customSanitizer(UrlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .customSanitizer(NoSpaceSanitizer.validatorCustomSanitizer())
                .customSanitizer(NoAccentSanitizer.validatorCustomSanitizer())
                .customSanitizer(LatinSanitizer.validatorCustomSanitizer())
                .trim()*/
        ]
    }
}
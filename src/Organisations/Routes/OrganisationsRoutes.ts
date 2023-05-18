import express from "express";
import OrganisationsController from "../Controllers/OrganisationsController";
import CrudRoute from "../../Abstract/CrudRoute";
import AbstractController from "../../Abstract/Controller";
import {body} from "express-validator";
import {HtmlSanitizer} from "../../Security/Sanitizers/HtmlSanitizer";
import {NoHtmlSanitizer} from "../../Security/Sanitizers/NoHtmlSanitizer";
import {NoSpaceSanitizer} from "../../Security/Sanitizers/NoSpaceSanitizer";
import {NoAccentSanitizer} from "../../Security/Sanitizers/NoAccentSanitizer";
import {UrlSanitizer} from "../../Security/Sanitizers/UrlSanitizer";
import {LatinSanitizer} from "../../Security/Sanitizers/LatinSanitizer";
import {IsObjectIdStringValid} from "../../Security/Validators/IsObjectidValidator";
import {ObjectIdStringSanitizer} from "../../Security/Sanitizers/ObjectIdStringSanitizer";
import {isObjectId} from "../../Security/SanitizerAliases/ObjectIdSanitizer";

class OrganisationsRoutes extends CrudRoute {
    controllerInstance: AbstractController = OrganisationsController.getInstance();
    routerInstance: express.Router = express.Router();
    routerInstanceAuthentification: express.Router = express.Router();

    middlewaresDistribution:any = {
        all: [],
        createUpdate: [],
        create: [
            body('data.name').isLength({min:1}).bail()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .trim(),
            //I remove espace() sanitizer here, because I didn't find any way yet to handle the unescape method for each of those field.
            body('data.description').optional()
                .customSanitizer(HtmlSanitizer.validatorCustomSanitizer())
                .trim(),
            body('data.url').exists({checkFalsy:true}).bail()
                .stripLow()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .customSanitizer(NoSpaceSanitizer.validatorCustomSanitizer())
                .customSanitizer(NoAccentSanitizer.validatorCustomSanitizer())
                .customSanitizer(LatinSanitizer.validatorCustomSanitizer())
                .trim()
                .customSanitizer(UrlSanitizer.validatorCustomSanitizer()),
            body('data.contactPoint').exists({checkFalsy:true}).bail()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .normalizeEmail()
                .trim(),
            body('data.fondationDate').exists({checkFalsy:true}).bail()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .trim()
                .toDate(),
            body('data.offers.*.offer').exists({checkFalsy:true}).bail()
                .custom(IsObjectIdStringValid.validatorCustom())
                .customSanitizer(ObjectIdStringSanitizer.validatorCustomSanitizer())
                .trim(),
            body('data.team.*.member').exists({checkFalsy:true}).bail()
                .custom(IsObjectIdStringValid.validatorCustom())
                .customSanitizer(ObjectIdStringSanitizer.validatorCustomSanitizer())
                .trim(),
        ],
        update: [
            isObjectId('data.id'),
            body('data.name').exists({checkFalsy:true}).bail()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .trim(),
            //I remove espace() sanitizer here, because I didn't find any way yet to handle the unescape method for each of those field.
            body('data.description').exists({checkFalsy:true}).bail()
                .customSanitizer(HtmlSanitizer.validatorCustomSanitizer())
                .trim(),
            body('data.url').exists({checkFalsy:true}).bail()
                .customSanitizer(UrlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .customSanitizer(NoSpaceSanitizer.validatorCustomSanitizer())
                .customSanitizer(NoAccentSanitizer.validatorCustomSanitizer())
                .customSanitizer(LatinSanitizer.validatorCustomSanitizer())
                .trim(),
            body('data.contactPoint').exists({checkFalsy:true}).bail()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .normalizeEmail()
                .stripLow()
                .trim(),
            body('data.fondationDate').exists({checkFalsy:true}).bail()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .trim()
                .toDate(),
            body('data.offers.*.offer').exists({checkFalsy:true}).bail()
                .custom(IsObjectIdStringValid.validatorCustom())
                .customSanitizer(ObjectIdStringSanitizer.validatorCustomSanitizer())
                .trim(),
            body('data.team.*.member').exists({checkFalsy:true}).bail()
                .custom(IsObjectIdStringValid.validatorCustom())
                .customSanitizer(ObjectIdStringSanitizer.validatorCustomSanitizer())
                .trim(),
        ],
        delete: [],
        search: [],
        list: [],
        getinfo: [],
        getdoc: [],
    }
}
export {OrganisationsRoutes};

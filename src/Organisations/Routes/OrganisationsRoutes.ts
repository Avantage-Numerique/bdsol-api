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

class OrganisationsRoutes extends CrudRoute {
    controllerInstance: AbstractController = OrganisationsController.getInstance();
    routerInstance: express.Router = express.Router();
    routerInstanceAuthentification: express.Router = express.Router();

    middlewaresDistribution:any = {
        all: [],
        createUpdate: [],
        create: [
            body('data.name')
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .trim(),
            //I remove espace() sanitizer here, because I didn't find any way yet to handle the unescape method for each of those field.
            body('data.description').optional()
                .customSanitizer(HtmlSanitizer.validatorCustomSanitizer())
                .trim(),
            body('data.url').optional()
                .stripLow()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .customSanitizer(NoSpaceSanitizer.validatorCustomSanitizer())
                .customSanitizer(NoAccentSanitizer.validatorCustomSanitizer())
                .customSanitizer(LatinSanitizer.validatorCustomSanitizer())
                .trim()
                .customSanitizer(UrlSanitizer.validatorCustomSanitizer()),
            body('data.contactPoint').optional()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .trim(),
            body('data.fondationDate').optional()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .trim()
                .toDate(),
        ],
        update: [
            body('data.name').optional()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .trim(),
            //I remove espace() sanitizer here, because I didn't find any way yet to handle the unescape method for each of those field.
            body('data.description').optional()
                .customSanitizer(HtmlSanitizer.validatorCustomSanitizer())
                .trim(),
            body('data.url').optional()
                .customSanitizer(UrlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .customSanitizer(NoSpaceSanitizer.validatorCustomSanitizer())
                .customSanitizer(NoAccentSanitizer.validatorCustomSanitizer())
                .customSanitizer(LatinSanitizer.validatorCustomSanitizer())
                .trim(),
            body('data.contactPoint').optional()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .normalizeEmail()
                .stripLow()
                .trim(),
            body('data.fondationDate').optional()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .trim()
                .toDate(),
        ],
        delete: [],
        search: [],
        list: [],
        getinfo: [],
        getdoc: [],
    }
}
export {OrganisationsRoutes};

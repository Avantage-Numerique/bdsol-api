import express from "express";
import {TaxonomyController} from "../Controllers/TaxonomyController";
import AbstractRoute from "../../Abstract/Route";
import AbstractController from "../../Abstract/Controller";
import {body} from "express-validator";
import {NoHtmlSanitizer} from "../../Security/Sanitizers/NoHtmlSanitizer";
import {HtmlSanitizer} from "../../Security/Sanitizers/HtmlSanitizer";

class TaxonomyRoutes extends AbstractRoute {
    controllerInstance: AbstractController = TaxonomyController.getInstance();
    routerInstance: express.Router = express.Router();
    routerInstanceAuthentification: express.Router = express.Router();


    middlewaresDistribution:any = {
        all: [],
        create: [
            body('data.category')
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .trim(),
            //I remove espace() sanitizer here, because I didn't find any way yet to handle the unescape method for each of those field.
            body('data.name')
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .trim(),
            body('data.slug')
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()//only alpha num acii beteween 32 and 13-ish
                .trim(),//no space
            body('data.description')
                .customSanitizer(HtmlSanitizer.validatorCustomSanitizer())
                .trim(),
            body('data.source')
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .trim()
        ],
        createUpdate: [],
        update: [],
        delete: [],
        search: [],
        list: [],
        getinfo: [],
        getdoc: [],
    }
}

export {TaxonomyRoutes};
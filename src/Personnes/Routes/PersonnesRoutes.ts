import express from "express";
import {PersonnesController} from "../Controllers/PersonnesController";
import AbstractController from "../../Abstract/Controller";
import {body} from "express-validator";
import {HtmlSanitizer} from "../../Security/Sanitizers/HtmlSanitizer";
import {NoHtmlSanitizer} from "../../Security/Sanitizers/NoHtmlSanitizer";
import CrudRoute from "../../Abstract/CrudRoute";

class PersonnesRoutes extends CrudRoute {
    controllerInstance: AbstractController = PersonnesController.getInstance();
    routerInstance: express.Router = express.Router();
    routerInstanceAuthentification: express.Router = express.Router();

    middlewaresDistribution:any = {
        all: [],
        createUpdate: [],
        create: [
            body('data.lastName')
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .trim(),
            body('data.firstName')
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .trim(),
            body('data.nickname')
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .trim(),
            body('data.description')
                .customSanitizer(HtmlSanitizer.validatorCustomSanitizer())
                .trim(),
        ],
        update: [
            body('data.lastName').optional()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .trim(),
            body('data.firstName').optional()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .trim(),
            body('data.nickname').optional()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .trim(),
            body('data.description').optional()
                .customSanitizer(HtmlSanitizer.validatorCustomSanitizer())
                .trim()
        ],
        delete: [],
        search: [],
        list: [],
        getinfo: [],
        getdoc: [],
    }
}
export {PersonnesRoutes};
import express from "express";
import {PersonsController} from "../Controllers/PersonsController";
import AbstractController from "../../Abstract/Controller";
import {body} from "express-validator";
import {HtmlSanitizer} from "../../Security/Sanitizers/HtmlSanitizer";
import {NoHtmlSanitizer} from "../../Security/Sanitizers/NoHtmlSanitizer";
import CrudRoute from "../../Abstract/CrudRoute";

class PersonsRoutes extends CrudRoute {

    controllerInstance: AbstractController = PersonsController.getInstance();
    routerInstance: express.Router = express.Router();
    routerInstanceAuthentification: express.Router = express.Router();

    middlewaresDistribution:any = {
        all: [],
        createUpdate: [],
        create: [
            body('data.lastName').exists({checkFalsy:true}).bail()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .trim(),
            body('data.firstName').exists({checkFalsy:true}).bail()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .trim(),
            body('data.nickname').exists({checkFalsy:true}).bail()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .trim(),
            body('data.description').exists({checkFalsy:true}).bail()
                .customSanitizer(HtmlSanitizer.validatorCustomSanitizer())
                .trim(),
        ],
        update: [
            body('data.lastName').exists({checkFalsy:true}).bail()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .trim(),
            body('data.firstName').exists({checkFalsy:true}).bail()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .trim(),
            body('data.nickname').exists({checkFalsy:true}).bail()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .trim(),
            body('data.description').exists({checkFalsy:true}).bail()
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
export {PersonsRoutes};
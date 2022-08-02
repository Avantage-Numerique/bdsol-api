import express from "express";
import {PersonnesController} from "../Controllers/PersonnesController";
import AbstractRoute from "../../Abstract/Route";
import AbstractController from "../../Abstract/Controller";
import {body} from "express-validator";
import {HtmlSanitizer} from "../../Security/Sanitizers/HtmlSanitizer";
import {NoHtmlSanitizer} from "../../Security/Sanitizers/NoHtmlSanitizer";

class PersonnesRoutes extends AbstractRoute {
    controllerInstance: AbstractController = PersonnesController.getInstance();
    routerInstance: express.Router = express.Router();
    routerInstanceAuthentification: express.Router = express.Router();

    middlewaresDistribution:any = {
        all: [],
        create: [
            body('data.lastName').customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer()).trim(),
            body('data.firstName').customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer()).trim(),
            body('data.nickname').customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer()).trim(),
            body('data.description').customSanitizer(HtmlSanitizer.validatorCustomSanitizer()).trim(),
            //occupation array of objectid
        ],
        update: [],
        delete: [],
        search: [],
        list: [],
        getinfo: [],
        getdoc: [],
    }
}
export {PersonnesRoutes};
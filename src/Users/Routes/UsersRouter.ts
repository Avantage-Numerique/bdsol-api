import express from "express";
import {UsersController} from "../Controllers/UsersController";
import AbstractController from "../../Abstract/Controller";
import {body} from "express-validator";
import {NoHtmlSanitizer} from "../../Security/Sanitizers/NoHtmlSanitizer";
import {NoSpaceSanitizer} from "../../Security/Sanitizers/NoSpaceSanitizer";
import {NoAccentSanitizer} from "../../Security/Sanitizers/NoAccentSanitizer";
import CrudRoute from "../../Abstract/CrudRoute";

class UsersRoutes extends CrudRoute {
    controllerInstance: AbstractController = UsersController.getInstance();
    routerInstance: express.Router = express.Router();
    routerInstanceAuthentification: express.Router = express.Router();


    middlewaresDistribution:any = {
        all: [],
        create: [
            body('data.username')
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .customSanitizer(NoSpaceSanitizer.validatorCustomSanitizer())
                .customSanitizer(NoAccentSanitizer.validatorCustomSanitizer())
                .trim(),
            //ajouter lowercase
            body('data.email')
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .normalizeEmail()
                .trim(),
            //body('data.password'),
            body('data.avatar').optional()
                .isURL()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .trim(),
            body('data.name').optional()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .trim(),
            body('data.role').optional()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .trim(),
        ],
        createUpdate: [],
        update: [
            body('data.username').optional()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .customSanitizer(NoSpaceSanitizer.validatorCustomSanitizer())
                .customSanitizer(NoAccentSanitizer.validatorCustomSanitizer())
                .trim(),
            body('data.email').optional()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .normalizeEmail()
                .trim(),
            //body('data.password'),
            body('data.avatar').optional()
                .isURL()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .trim(),
            body('data.name').optional()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .trim(),
            body('data.role').optional()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .trim(),
        ],
        delete: [],
        search: [],
        list: [],
        getinfo: [],
        getdoc: [],
    }
}
export {UsersRoutes};
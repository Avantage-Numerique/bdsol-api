import express from "express";
import {body} from "express-validator";
import AbstractController from "@core/Controller";
import CrudRoute from "@core/CrudRoute";
import {UsersController} from "@src/Users/Controllers/UsersController";
import {NoHtmlSanitizer} from "@src/Security/Sanitizers/NoHtmlSanitizer";
import {NoSpaceSanitizer} from "@src/Security/Sanitizers/NoSpaceSanitizer";
import {NoAccentSanitizer} from "@src/Security/Sanitizers/NoAccentSanitizer";
import {AlphaNumOnlySanitizer} from "@src/Security/Sanitizers/AlphaNumOnlySanitizer";

class UsersRoutes extends CrudRoute {
    controllerInstance: AbstractController = UsersController.getInstance();
    routerInstance: express.Router = express.Router();
    routerInstanceAuthentification: express.Router = express.Router();


    middlewaresDistribution:any = {
        all: [],
        create: [
            body('data.username').exists({checkFalsy:true}).bail()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .customSanitizer(NoSpaceSanitizer.validatorCustomSanitizer())
                .customSanitizer(NoAccentSanitizer.validatorCustomSanitizer())
                .stripLow()
                .customSanitizer(AlphaNumOnlySanitizer.validatorCustomSanitizer())
                .trim(),
            //ajouter lowercase
            body('data.email').exists({checkFalsy:true}).bail()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .normalizeEmail()
                .trim(),
            //body('data.password'),
            body('data.avatar').exists({checkFalsy:true}).bail()
                .isURL()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .trim(),
            body('data.name').exists({checkFalsy:true}).bail()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .trim(),
            body('data.firstName').exists({checkFalsy:true}).bail()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .trim(),
            body('data.lastName').exists({checkFalsy:true}).bail()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .trim(),
            body('data.role').exists({checkFalsy:true}).bail()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .trim(),
        ],
        createUpdate: [],
        update: [
            body('data.username').exists({checkFalsy:true}).bail()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .customSanitizer(NoSpaceSanitizer.validatorCustomSanitizer())
                .customSanitizer(NoAccentSanitizer.validatorCustomSanitizer())
                .trim(),
            body('data.email').exists({checkFalsy:true}).bail()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .normalizeEmail()
                .trim(),
            //body('data.password'),
            body('data.avatar').exists({checkFalsy:true}).bail()
                .isURL()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .trim(),
            body('data.name').exists({checkFalsy:true}).bail()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .trim(),
            body('data.firstName').exists({checkFalsy:true}).bail()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .trim(),
            body('data.lastName').exists({checkFalsy:true}).bail()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .trim(),
            body('data.role').exists({checkFalsy:true}).bail()
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
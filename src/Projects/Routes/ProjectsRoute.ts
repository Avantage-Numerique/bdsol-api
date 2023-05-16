import express from "express";
import ProjectsController from "../Controllers/ProjectsController";
import AbstractController from "../../Abstract/Controller";
import CrudRoute from "../../Abstract/CrudRoute";
import {body} from "express-validator";
import {EnumSanitizer} from "../../Security/Sanitizers/EnumSanitizer";
import {ProjectContextEnum} from "../ProjectContextEnum";
import {isObjectId} from "../../Security/SanitizerAliases/ObjectIdSanitizer";
import {isURL} from "../../Security/SanitizerAliases/UrlSanitizer";
import {isContactPoint} from "../../Security/SanitizerAliases/ContactSanitizer";
import {EntityNameSanitizer} from "../../Security/SanitizerAliases/EntityNameSanitizer";
import {basicHtmlSanitizer} from "../../Security/SanitizerAliases/BasicHtmlSanitizer";
import {noHtmlStringSanitizer} from "../../Security/SanitizerAliases/NoHtmlStringSanitizer";

class ProjectsRoutes extends CrudRoute {

    controllerInstance: AbstractController = ProjectsController.getInstance();
    routerInstance: express.Router = express.Router();
    routerInstanceAuthentification: express.Router = express.Router();

    middlewaresDistribution: any = {
        all: [],
        createUpdate: [],
        create: [
            body('data.name')
                .isLength({min:2})
                .withMessage('[EntityNameSanitizer] must be at least 2 chars long'),
        ],
        update: [
            /*body('data.name')
                .isLength({min:2})
                .withMessage('[EntityNameSanitizer] must be at least 2 chars long'),

            noHtmlStringSanitizer('data.alternateName'),

            isObjectId('data.entityInCharge'),

            isObjectId('data.producer'),

            basicHtmlSanitizer('data.description'),

            isURL('data.url'),

            isContactPoint('data.contactPoint'),

            body('data.context').exists({checkNull:true}).bail()
                .customSanitizer(EnumSanitizer.validatorCustomSanitizer(ProjectContextEnum)),

            body('data.location').exists({checkNull:true}).bail(),

            body('data.team').exists({checkNull:true}).bail()
                .isArray(),
            isObjectId('data.team.*'),
            //body('data.sponsor').exists({checkNull:true}).bail(),
            //body('data.scheduleBudget').exists({checkNull:true}).bail(),

            isObjectId('data.mainImage').trim(),

            /*body('data.skills').exists({checkNull:true}).bail()
                .custom(IsObjectIdStringValid.validatorCustom())
                .customSanitizer(ObjectIdStringSanitizer.validatorCustomSanitizer())
                .trim(),*/

            //status not sanitize yet, because it will be manage by backend*/
        ],
        delete: [],
        search: [],
        list: [],
        getinfo: [],
        getdoc: []
    }

    public setupAdditionnalPublicRoutes(router: express.Router): express.Router {
        return router;
    }

    public setupAdditionnalAuthRoutes(router: express.Router): express.Router {
        return router;
    }

    public addMiddlewares(route: string, middlewares: string = ""): Array<any> {
        if (route === "create") console.log("Projets addMiddlewares", this.middlewaresDistribution[route]);
        return super.addMiddlewares(route, middlewares);
    }
}

export {ProjectsRoutes};
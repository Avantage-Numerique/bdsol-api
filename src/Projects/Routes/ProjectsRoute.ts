import express from "express";
import ProjectsController from "../Controllers/ProjectsController";
import AbstractController from "../../Abstract/Controller";
import CrudRoute from "../../Abstract/CrudRoute";
import {isObjectId} from "../../Security/SanitizerAliases/ObjectIdSanitizer";
import {isURL} from "../../Security/SanitizerAliases/UrlSanitizer";
import {isContactPoint} from "../../Security/SanitizerAliases/ContactSanitizer";
import {EntityName} from "../../Security/SanitizerAliases/EntityNameSanitizer";
import {basicHtmlSanitizer} from "../../Security/SanitizerAliases/BasicHtmlSanitizer";
import {noHtml} from "../../Security/SanitizerAliases/NoHtmlStringSanitizer";

class ProjectsRoutes extends CrudRoute {

    controllerInstance: AbstractController = ProjectsController.getInstance();
    routerInstance: express.Router = express.Router();
    routerInstanceAuthentification: express.Router = express.Router();

    middlewaresDistribution: any = {
        all: [],
        createUpdate: [],
        create: [
            EntityName('data.name', false),

            noHtml('data.alternateName'),

            isObjectId('data.entityInCharge'),

            isObjectId('data.producer'),

            basicHtmlSanitizer('data.description'),

            isURL('data.url'),

            isContactPoint('data.contactPoint'),

            //body('data.context').exists({checkNull:true}).bail().customSanitizer(EnumSanitizer.validatorCustomSanitizer(ProjectContextEnum)),

            //body('data.location').exists({checkNull:true}).bail(),

            //body('data.team').exists({checkNull:true}).bail().isArray(),

            isObjectId('data.team.*'),

            //body('data.sponsor').exists({checkNull:true}).bail(),
            //body('data.scheduleBudget').exists({checkNull:true}).bail(),

            isObjectId('data.mainImage'),

            /*body('data.skills').exists({checkNull:true}).bail()
                .custom(IsObjectIdStringValid.validatorCustom())
                .customSanitizer(ObjectIdStringSanitizer.validatorCustomSanitizer())
                .trim(),*/

            //status not sanitize yet, because it will be manage by backend*/
        ],
        update: [
            isObjectId('data.id'),

            EntityName('data.name'),

            noHtml('data.alternateName'),

            isObjectId('data.entityInCharge'),

            isObjectId('data.producer'),

            basicHtmlSanitizer('data.description'),

            isURL('data.url'),

            isContactPoint('data.contactPoint'),

            //body('data.context').exists({checkNull:true}).bail().customSanitizer(EnumSanitizer.validatorCustomSanitizer(ProjectContextEnum)),

            //body('data.location').exists({checkNull:true}).bail(),

            //body('data.team').exists({checkNull:true}).bail().isArray(),

            isObjectId('data.team.*'),

            //body('data.sponsor').exists({checkNull:true}).bail(),
            //body('data.scheduleBudget').exists({checkNull:true}).bail(),

            isObjectId('data.mainImage'),

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
}

export {ProjectsRoutes};
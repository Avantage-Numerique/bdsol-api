import express from "express";
import ProjectsController from "../Controllers/ProjectsController";
import AbstractController from "../../Abstract/Controller";
import CrudRoute from "../../Abstract/CrudRoute";
import {objectIdSanitizerAlias} from "../../Security/SanitizerAliases/ObjectIdSanitizerAlias";
import {urlSanitizerAlias} from "../../Security/SanitizerAliases/UrlSanitizerAlias";
import {contactPointSanitizerAlias} from "../../Security/SanitizerAliases/ContactSanitizerAlias";
import {entityNameSanitizerAlias} from "../../Security/SanitizerAliases/EntityNameSanitizerAlias";
import {basicHtmlSanitizerAlias} from "../../Security/SanitizerAliases/BasicHtmlSanitizerAlias";
import {noHtmlStringSanitizerAlias} from "../../Security/SanitizerAliases/NoHtmlStringSanitizerAlias";

class ProjectsRoutes extends CrudRoute {

    controllerInstance: AbstractController = ProjectsController.getInstance();
    routerInstance: express.Router = express.Router();
    routerInstanceAuthentification: express.Router = express.Router();

    middlewaresDistribution: any = {
        all: [],
        createUpdate: [],
        create: [
            entityNameSanitizerAlias('data.name', false),
            noHtmlStringSanitizerAlias('data.alternateName'),
            objectIdSanitizerAlias('data.entityInCharge'),
            objectIdSanitizerAlias('data.producer'),
            basicHtmlSanitizerAlias('data.description'),
            urlSanitizerAlias('data.url'),
            contactPointSanitizerAlias('data.contactPoint'),
            //body('data.context').exists({checkNull:true}).bail().customSanitizer(EnumSanitizer.validatorCustomSanitizer(ProjectContextEnum)),
            //body('data.location').exists({checkNull:true}).bail(),
            //body('data.team').exists({checkNull:true}).bail().isArray(),
            objectIdSanitizerAlias('data.team.*.member'),
            //body('data.sponsor').exists({checkNull:true}).bail(),
            //body('data.scheduleBudget').exists({checkNull:true}).bail(),
            objectIdSanitizerAlias('data.mainImage'),
            objectIdSanitizerAlias('data.location.*'),
            objectIdSanitizerAlias('data.equipment.*'),

            /*body('data.skills').exists({checkNull:true}).bail()
                .custom(IsObjectIdStringValid.validatorCustom())
                .customSanitizer(ObjectIdStringSanitizer.validatorCustomSanitizer())
                .trim(),*/
            //status not sanitize yet, because it will be manage by backend*/
        ],
        update: [
            objectIdSanitizerAlias('data.id'),
            entityNameSanitizerAlias('data.name'),
            noHtmlStringSanitizerAlias('data.alternateName'),
            objectIdSanitizerAlias('data.entityInCharge'),
            objectIdSanitizerAlias('data.producer'),
            basicHtmlSanitizerAlias('data.description'),
            urlSanitizerAlias('data.url'),
            contactPointSanitizerAlias('data.contactPoint'),
            objectIdSanitizerAlias('data.team.*.member'),
            objectIdSanitizerAlias('data.mainImage'),
            objectIdSanitizerAlias('data.location.*'),
            objectIdSanitizerAlias('data.equipment.*'),


            //body('data.context').exists({checkNull:true}).bail().customSanitizer(EnumSanitizer.validatorCustomSanitizer(ProjectContextEnum)),
            //body('data.location').exists({checkNull:true}).bail(),
            //body('data.team').exists({checkNull:true}).bail().isArray(),

            //body('data.sponsor').exists({checkNull:true}).bail(),
            //body('data.scheduleBudget').exists({checkNull:true}).bail(),

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
import express from "express";
import ProjectsController from "@src/Projects/Controllers/ProjectsController";
import AbstractController from "@core/Controller";
import CrudRoute from "@core/CrudRoute";
import {objectIdSanitizerAlias} from "@src/Security/SanitizerAliases/ObjectIdSanitizerAlias";
import {urlSanitizerAlias} from "@src/Security/SanitizerAliases/UrlSanitizerAlias";
import {contactPointSanitizerAlias} from "@src/Security/SanitizerAliases/ContactSanitizerAlias";
import {entityNameSanitizerAlias} from "@src/Security/SanitizerAliases/EntityNameSanitizerAlias";
import {basicHtmlSanitizerAlias} from "@src/Security/SanitizerAliases/BasicHtmlSanitizerAlias";
import {noHtmlStringSanitizerAlias} from "@src/Security/SanitizerAliases/NoHtmlStringSanitizerAlias";
import {dateSanitizerAlias} from "@src/Security/SanitizerAliases/DateSanitizerAlias";
import {isInEnumSanitizerAlias} from "@src/Security/SanitizerAliases/IsInEnumSanitizerAlias";
import {ProjectContextEnum} from "@src/Projects/ProjectContextEnum";
import { IntegerSanitizerAlias } from "@src/Security/SanitizerAliases/IntegerSanitizerAlias";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

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

            //SocialHandles
            basicHtmlSanitizerAlias('data.url.*.label'),
            urlSanitizerAlias('data.url.*.url'),

            objectIdSanitizerAlias('data.location.*'),
            objectIdSanitizerAlias('data.team.*.member'),
            noHtmlStringSanitizerAlias('data.team.*.role'),
            objectIdSanitizerAlias('data.mainImage'),

            //budget
            dateSanitizerAlias('data.scheduleBudget.startDate'),
            dateSanitizerAlias('data.scheduleBudget.endDateEstimate'),
            dateSanitizerAlias('data.scheduleBudget.completionDate'),

            noHtmlStringSanitizerAlias('data.scheduleBudget.eta'),
            noHtmlStringSanitizerAlias('data.scheduleBudget.timeframe.*.step'),
            noHtmlStringSanitizerAlias('data.scheduleBudget.timeframe.*.eta'),
            noHtmlStringSanitizerAlias('data.scheduleBudget.timeframe.*.budgetRange'),

            //skills
            objectIdSanitizerAlias('data.skills.*'),
            objectIdSanitizerAlias('data.domains.*.domain'),

            //context
            isInEnumSanitizerAlias('data.context', ProjectContextEnum),
            objectIdSanitizerAlias('data.equipment.*'),

            //sponsor
            basicHtmlSanitizerAlias('data.sponsor.*.name'),
            objectIdSanitizerAlias('data.sponsor.*.entity'),
            isInEnumSanitizerAlias('data.sponsor.*.entityType', EntityTypesEnum),
            IntegerSanitizerAlias('data.sponsor.*.subMeta.order'),

            //contactPoint
            noHtmlStringSanitizerAlias('data.contactPoint.tel.num'),
            noHtmlStringSanitizerAlias('data.contactPoint.tel.ext'),
            noHtmlStringSanitizerAlias('data.contactPoint.email.address'),
            noHtmlStringSanitizerAlias('data.contactPoint.website.url'),
            
        ],
        update: [
            objectIdSanitizerAlias('data.id'),
            entityNameSanitizerAlias('data.name', false),
            noHtmlStringSanitizerAlias('data.alternateName'),
            objectIdSanitizerAlias('data.entityInCharge'),
            objectIdSanitizerAlias('data.producer'),
            basicHtmlSanitizerAlias('data.description'),

            //SocialHandles
            basicHtmlSanitizerAlias('data.url.*.label'),
            urlSanitizerAlias('data.url.*.url'),

            objectIdSanitizerAlias('data.location.*'),
            objectIdSanitizerAlias('data.team.*.member'),
            noHtmlStringSanitizerAlias('data.team.*.role'),
            objectIdSanitizerAlias('data.mainImage'),

            //budget
            dateSanitizerAlias('data.scheduleBudget.startDate'),
            dateSanitizerAlias('data.scheduleBudget.endDateEstimate'),
            dateSanitizerAlias('data.scheduleBudget.completionDate'),

            noHtmlStringSanitizerAlias('data.scheduleBudget.eta'),
            noHtmlStringSanitizerAlias('data.scheduleBudget.timeframe.*.step'),
            noHtmlStringSanitizerAlias('data.scheduleBudget.timeframe.*.eta'),
            noHtmlStringSanitizerAlias('data.scheduleBudget.timeframe.*.budgetRange'),

            //skills
            objectIdSanitizerAlias('data.skills.*'),
            objectIdSanitizerAlias('data.domains.*.domain'),

            //context
            isInEnumSanitizerAlias('data.context', ProjectContextEnum),
            objectIdSanitizerAlias('data.equipment.*'),
        
            //sponsor
            basicHtmlSanitizerAlias('data.sponsor.*.name'),
            objectIdSanitizerAlias('data.sponsor.*.entity'),
            isInEnumSanitizerAlias('data.sponsor.*.entityType', EntityTypesEnum),
            IntegerSanitizerAlias('data.sponsor.*.subMeta.order'),

            //contactPoint
            noHtmlStringSanitizerAlias('data.contactPoint.tel.num'),
            noHtmlStringSanitizerAlias('data.contactPoint.tel.ext'),
            noHtmlStringSanitizerAlias('data.contactPoint.email.address'),
            noHtmlStringSanitizerAlias('data.contactPoint.website.url'),
            
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
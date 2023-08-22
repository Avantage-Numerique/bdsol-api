import express from "express";
import AbstractController from "@core/Controller";
import CrudRoute from "@core/CrudRoute";
import EventsController from "@src/Events/Controllers/EventsController";
import {objectIdSanitizerAlias} from "@src/Security/SanitizerAliases/ObjectIdSanitizerAlias";
import {noHtmlStringSanitizerAlias} from "@src/Security/SanitizerAliases/NoHtmlStringSanitizerAlias";
import {basicHtmlSanitizerAlias} from "@src/Security/SanitizerAliases/BasicHtmlSanitizerAlias";
import {contactPointSanitizerAlias} from "@src/Security/SanitizerAliases/ContactSanitizerAlias";
import {entityNameSanitizerAlias} from "@src/Security/SanitizerAliases/EntityNameSanitizerAlias";
import {urlSanitizerAlias} from "@src/Security/SanitizerAliases/UrlSanitizerAlias";
import {dateSanitizerAlias} from "@src/Security/SanitizerAliases/DateSanitizerAlias";

class EventsRoutes extends CrudRoute {

    controllerInstance: AbstractController = EventsController.getInstance();
    routerInstance: express.Router = express.Router();
    routerInstanceAuthentification: express.Router = express.Router();

    middlewaresDistribution: any = {
        all: [],
        createUpdate: [],
        create: [
            entityNameSanitizerAlias('data.name', false),
            noHtmlStringSanitizerAlias('data.alternateName'),
            urlSanitizerAlias('data.url'),
            basicHtmlSanitizerAlias('data.description'),
            objectIdSanitizerAlias('data.entityInCharge'),
            objectIdSanitizerAlias('data.organizer'),
            objectIdSanitizerAlias('data.eventType.*'),
            objectIdSanitizerAlias('data.team.*.member'),
            dateSanitizerAlias('data.startDate'),
            dateSanitizerAlias('data.endDate'),
            contactPointSanitizerAlias('data.contactPoint'),
            objectIdSanitizerAlias('data.mainImage'),
            objectIdSanitizerAlias('data.attendees.*'),
            objectIdSanitizerAlias('data.skills.*'),
            //domain?
            //schedule
            objectIdSanitizerAlias('data.subEvents.*'),
        ],
        update: [
            objectIdSanitizerAlias('data.id'),
            entityNameSanitizerAlias('data.name', false),
            noHtmlStringSanitizerAlias('data.alternateName'),
            urlSanitizerAlias('data.url'),
            basicHtmlSanitizerAlias('data.description'),
            objectIdSanitizerAlias('data.entityInCharge'),
            objectIdSanitizerAlias('data.organizer'),
            objectIdSanitizerAlias('data.eventType.*'),
            objectIdSanitizerAlias('data.team.*.member'),
            dateSanitizerAlias('data.startDate'),
            dateSanitizerAlias('data.endDate'),
            contactPointSanitizerAlias('data.contactPoint'),
            objectIdSanitizerAlias('data.mainImage'),
            objectIdSanitizerAlias('data.attendees.*'),
            objectIdSanitizerAlias('data.skills.*'),
            //domain?
            //schedule
            objectIdSanitizerAlias('data.subEvents.*'),
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

export {EventsRoutes};
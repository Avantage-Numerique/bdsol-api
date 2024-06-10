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
import { isInEnumSanitizerAlias } from "@src/Security/SanitizerAliases/IsInEnumSanitizerAlias";
import { EventFormatEnum } from "../EventFormatEnum";
import { IntegerSanitizerAlias } from "@src/Security/SanitizerAliases/IntegerSanitizerAlias";

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
            //SocialHandles
            basicHtmlSanitizerAlias('data.url.*.label'),
            urlSanitizerAlias('data.url.*.url'),

            basicHtmlSanitizerAlias('data.description'),
            objectIdSanitizerAlias('data.entityInCharge'),
            objectIdSanitizerAlias('data.organizer'),
            objectIdSanitizerAlias('data.eventType.*'),
            isInEnumSanitizerAlias('data.eventFormat', EventFormatEnum),
            objectIdSanitizerAlias('data.team.*.member'),
            dateSanitizerAlias('data.startDate'),
            dateSanitizerAlias('data.endDate'),
            objectIdSanitizerAlias('data.mainImage'),
            objectIdSanitizerAlias('data.attendees.*'),
            objectIdSanitizerAlias('data.skills.*'),
            objectIdSanitizerAlias('data.domains.*.domain'),

            //schedule
            basicHtmlSanitizerAlias('data.schedule.*.name'),
            dateSanitizerAlias('data.schedule.*.startDate'),
            basicHtmlSanitizerAlias('data.schedule.*.startTime'),
            dateSanitizerAlias('data.schedule.*.endDate'),
            basicHtmlSanitizerAlias('data.schedule.*.endTime'),
            IntegerSanitizerAlias('data.schedule.*.subMeta.order'),

            objectIdSanitizerAlias('data.subEvents.*'),
            objectIdSanitizerAlias('data.location.*'),
            objectIdSanitizerAlias('data.photoGallery'),

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
            //SocialHandles
            basicHtmlSanitizerAlias('data.url.*.label'),
            urlSanitizerAlias('data.url.*.url'),

            basicHtmlSanitizerAlias('data.description'),
            objectIdSanitizerAlias('data.entityInCharge'),
            objectIdSanitizerAlias('data.organizer'),
            objectIdSanitizerAlias('data.eventType.*'),
            isInEnumSanitizerAlias('data.eventFormat', EventFormatEnum),
            objectIdSanitizerAlias('data.team.*.member'),
            dateSanitizerAlias('data.startDate'),
            dateSanitizerAlias('data.endDate'),
            objectIdSanitizerAlias('data.mainImage'),
            objectIdSanitizerAlias('data.attendees.*'),
            objectIdSanitizerAlias('data.skills.*'),
            objectIdSanitizerAlias('data.domains.*.domain'),

            //schedule
            basicHtmlSanitizerAlias('data.schedule.*.name'),
            dateSanitizerAlias('data.schedule.*.startDate'),
            basicHtmlSanitizerAlias('data.schedule.*.startTime'),
            dateSanitizerAlias('data.schedule.*.endDate'),
            basicHtmlSanitizerAlias('data.schedule.*.endTime'),
            IntegerSanitizerAlias('data.schedule.*.subMeta.order'),

            objectIdSanitizerAlias('data.subEvents.*'),
            objectIdSanitizerAlias('data.location.*'),
            objectIdSanitizerAlias('data.photoGallery'),

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

export {EventsRoutes};
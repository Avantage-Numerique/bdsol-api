import express from "express";
import PersonsController from "@src/Persons/Controllers/PersonsController";
import AbstractController from "@core/Controller";
import CrudRoute from "@core/CrudRoute";
import {objectIdSanitizerAlias} from "@src/Security/SanitizerAliases/ObjectIdSanitizerAlias";
import {noHtmlStringSanitizerAlias} from "@src/Security/SanitizerAliases/NoHtmlStringSanitizerAlias";
import {basicHtmlSanitizerAlias} from "@src/Security/SanitizerAliases/BasicHtmlSanitizerAlias";
import { urlSanitizerAlias } from "@src/Security/SanitizerAliases/UrlSanitizerAlias";

class PersonsRoutes extends CrudRoute {

    controllerInstance: AbstractController = PersonsController.getInstance();
    routerInstance: express.Router = express.Router();
    routerInstanceAuthentification: express.Router = express.Router();

    middlewaresDistribution:any = {
        all: [],
        createUpdate: [],
        create: [
            noHtmlStringSanitizerAlias('data.lastName', false),
            noHtmlStringSanitizerAlias('data.firstName', false),
            noHtmlStringSanitizerAlias('data.nickname'),
            basicHtmlSanitizerAlias('data.description'),
            objectIdSanitizerAlias('data.occupations.*.skills.*'),
            noHtmlStringSanitizerAlias('data.occupations.*.groupName.*'),
            objectIdSanitizerAlias('data.domains.*.domain'),
            objectIdSanitizerAlias('data.mainImage'),
            noHtmlStringSanitizerAlias('data.catchphrase'),

            //SocialHandles
            basicHtmlSanitizerAlias('data.url.*.label'),
            urlSanitizerAlias('data.url.*.url'),
            //contactPoint
            noHtmlStringSanitizerAlias('data.contactPoint.tel.num'),
            noHtmlStringSanitizerAlias('data.contactPoint.tel.ext'),
            noHtmlStringSanitizerAlias('data.contactPoint.email.address'),
            noHtmlStringSanitizerAlias('data.contactPoint.website.url'),
        ],
        update: [
            objectIdSanitizerAlias('data.id', false),
            noHtmlStringSanitizerAlias('data.lastName'),
            noHtmlStringSanitizerAlias('data.firstName'),
            noHtmlStringSanitizerAlias('data.nickname'),
            basicHtmlSanitizerAlias('data.description'),
            objectIdSanitizerAlias('data.occupations.*.skills.*'),
            noHtmlStringSanitizerAlias('data.occupations.*.groupName.*'),
            objectIdSanitizerAlias('data.domains.*.domain'),
            noHtmlStringSanitizerAlias('data.catchphrase'),
            
            //SocialHandles
            basicHtmlSanitizerAlias('data.url.*.label'),
            urlSanitizerAlias('data.url.*.url'),
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
        getdoc: [],
    }

}
export {PersonsRoutes};
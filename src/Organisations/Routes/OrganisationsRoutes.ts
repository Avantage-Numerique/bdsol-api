import express from "express";
import OrganisationsController from "../Controllers/OrganisationsController";
import CrudRoute from "@core/CrudRoute";
import AbstractController from "@core/Controller";
import {objectIdSanitizerAlias} from "@src/Security/SanitizerAliases/ObjectIdSanitizerAlias";
import {noHtmlStringSanitizerAlias} from "@src/Security/SanitizerAliases/NoHtmlStringSanitizerAlias";
import {basicHtmlSanitizerAlias} from "@src/Security/SanitizerAliases/BasicHtmlSanitizerAlias";
import {urlSanitizerAlias} from "@src/Security/SanitizerAliases/UrlSanitizerAlias";
import {dateSanitizerAlias} from "@src/Security/SanitizerAliases/DateSanitizerAlias";
import {entityNameSanitizerAlias} from "@src/Security/SanitizerAliases/EntityNameSanitizerAlias";

class OrganisationsRoutes extends CrudRoute {
    controllerInstance: AbstractController = OrganisationsController.getInstance();
    routerInstance: express.Router = express.Router();
    routerInstanceAuthentification: express.Router = express.Router();

    middlewaresDistribution:any = {
        all: [],
        createUpdate: [],
        create: [
            entityNameSanitizerAlias('data.name', false),
            basicHtmlSanitizerAlias('data.description'),
            //SocialHandles
            basicHtmlSanitizerAlias('data.url.*.label'),
            urlSanitizerAlias('data.url.*.url'),
            
            noHtmlStringSanitizerAlias('data.contactPoint'),
            dateSanitizerAlias('data.fondationDate'),
            objectIdSanitizerAlias('data.offers.*.skills.*'),
            noHtmlStringSanitizerAlias('data.offers.*.groupName.*'),
            objectIdSanitizerAlias('data.domains.*.domain'),
            objectIdSanitizerAlias('data.team.*.member'),
            noHtmlStringSanitizerAlias('data.team.*.role'),
            objectIdSanitizerAlias('data.mainImage'),
            noHtmlStringSanitizerAlias('data.catchphrase'),
            objectIdSanitizerAlias('data.location.*'),
            objectIdSanitizerAlias('data.equipment.*.equipment'),
        ],
        update: [
            objectIdSanitizerAlias('data.id', false),
            basicHtmlSanitizerAlias('data.description'),
            //SocialHandles
            basicHtmlSanitizerAlias('data.url.*.label'),
            urlSanitizerAlias('data.url.*.url'),
            
            noHtmlStringSanitizerAlias('data.contactPoint'),
            dateSanitizerAlias('data.fondationDate'),
            objectIdSanitizerAlias('data.offers.*.skills.*'),
            noHtmlStringSanitizerAlias('data.offers.*.groupName.*'),
            objectIdSanitizerAlias('data.domains.*.domain'),
            objectIdSanitizerAlias('data.team.*.member'),
            noHtmlStringSanitizerAlias('data.catchphrase'),
            objectIdSanitizerAlias('data.location.*'),
            objectIdSanitizerAlias('data.equipment.*.equipment'),
        ],
        delete: [],
        search: [],
        list: [],
        getinfo: [],
        getdoc: [],
    }
}
export {OrganisationsRoutes};

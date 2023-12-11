import express from "express";
import OrganisationsController from "../Controllers/OrganisationsController";
import CrudRoute from "../../Abstract/CrudRoute";
import AbstractController from "../../Abstract/Controller";
import {objectIdSanitizerAlias} from "../../Security/SanitizerAliases/ObjectIdSanitizerAlias";
import {noHtmlStringSanitizerAlias} from "../../Security/SanitizerAliases/NoHtmlStringSanitizerAlias";
import {basicHtmlSanitizerAlias} from "../../Security/SanitizerAliases/BasicHtmlSanitizerAlias";
import {urlSanitizerAlias} from "../../Security/SanitizerAliases/UrlSanitizerAlias";
import {dateSanitizerAlias} from "../../Security/SanitizerAliases/DateSanitizerAlias";
import {entityNameSanitizerAlias} from "../../Security/SanitizerAliases/EntityNameSanitizerAlias";

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
            objectIdSanitizerAlias('data.team.*.member'),
            objectIdSanitizerAlias('data.location.*'),
            objectIdSanitizerAlias('data.equipment.*.equipment'),
        ],
        update: [
            objectIdSanitizerAlias('data.id', false),
            entityNameSanitizerAlias('data.name'),
            basicHtmlSanitizerAlias('data.description'),
            //SocialHandles
            basicHtmlSanitizerAlias('data.url.*.label'),
            urlSanitizerAlias('data.url.*.url'),

            noHtmlStringSanitizerAlias('data.contactPoint'),
            dateSanitizerAlias('data.fondationDate'),
            objectIdSanitizerAlias('data.offers.*.skills.*'),
            noHtmlStringSanitizerAlias('data.offers.*.groupName.*'),
            objectIdSanitizerAlias('data.team.*.member'),
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

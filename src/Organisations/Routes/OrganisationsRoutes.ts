import express from "express";
import OrganisationsController from "../Controllers/OrganisationsController";
import CrudRoute from "../../Abstract/CrudRoute";
import AbstractController from "../../Abstract/Controller";
import {isObjectId} from "../../Security/SanitizerAliases/ObjectIdSanitizer";
import {noHtml} from "../../Security/SanitizerAliases/NoHtmlStringSanitizer";
import {basicHtmlSanitizer} from "../../Security/SanitizerAliases/BasicHtmlSanitizer";
import {isURL} from "../../Security/SanitizerAliases/UrlSanitizer";
import {dateSanitizer} from "../../Security/SanitizerAliases/DateSanitizer";
import {EntityName} from "../../Security/SanitizerAliases/EntityNameSanitizer";

class OrganisationsRoutes extends CrudRoute {
    controllerInstance: AbstractController = OrganisationsController.getInstance();
    routerInstance: express.Router = express.Router();
    routerInstanceAuthentification: express.Router = express.Router();

    middlewaresDistribution:any = {
        all: [],
        createUpdate: [],
        create: [
            EntityName('data.name', false),
            basicHtmlSanitizer('data.description'),
            isURL('data.url'),
            noHtml('data.contactPoint'),
            dateSanitizer('data.fondationDate'),
            isObjectId('data.offers.*.offer'),
            isObjectId('data.team.*.member')
        ],
        update: [
            isObjectId('data.id', false),
            EntityName('data.name'),
            basicHtmlSanitizer('data.description'),
            isURL('data.url'),
            noHtml('data.contactPoint'),
            dateSanitizer('data.fondationDate'),
            isObjectId('data.offers.*.offer'),
            isObjectId('data.team.*.member')
        ],
        delete: [],
        search: [],
        list: [],
        getinfo: [],
        getdoc: [],
    }
}
export {OrganisationsRoutes};

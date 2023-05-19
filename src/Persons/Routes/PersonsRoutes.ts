import express from "express";
import PersonsController from "../Controllers/PersonsController";
import AbstractController from "../../Abstract/Controller";
import CrudRoute from "../../Abstract/CrudRoute";
import {isObjectId} from "../../Security/SanitizerAliases/ObjectIdSanitizer";
import {noHtml} from "../../Security/SanitizerAliases/NoHtmlStringSanitizer";
import {basicHtmlSanitizer} from "../../Security/SanitizerAliases/BasicHtmlSanitizer";

class PersonsRoutes extends CrudRoute {

    controllerInstance: AbstractController = PersonsController.getInstance();
    routerInstance: express.Router = express.Router();
    routerInstanceAuthentification: express.Router = express.Router();


    middlewaresDistribution:any = {
        all: [],
        createUpdate: [],
        create: [
            noHtml('data.lastName', false),
            noHtml('data.firstName', false),
            noHtml('data.nickname'),
            basicHtmlSanitizer('data.description'),
            isObjectId('data.occupations.*.skills.*'),
            isObjectId('data.domains.*.domain'),
        ],
        update: [
            isObjectId('data.id', false),
            noHtml('data.lastName'),
            noHtml('data.firstName'),
            noHtml('data.nickname'),
            basicHtmlSanitizer('data.description'),
            isObjectId('data.occupations.*.skills.*'),
            isObjectId('data.domains.*.domain'),
        ],
        delete: [],
        search: [],
        list: [],
        getinfo: [],
        getdoc: [],
    }
}
export {PersonsRoutes};
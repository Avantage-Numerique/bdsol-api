import express from "express";
import PersonsController from "../Controllers/PersonsController";
import AbstractController from "../../Abstract/Controller";
import CrudRoute from "../../Abstract/CrudRoute";
import {objectIdSanitizerAlias} from "../../Security/SanitizerAliases/ObjectIdSanitizerAlias";
import {noHtmlStringSanitizerAlias} from "../../Security/SanitizerAliases/NoHtmlStringSanitizerAlias";
import {basicHtmlSanitizerAlias} from "../../Security/SanitizerAliases/BasicHtmlSanitizerAlias";

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
            objectIdSanitizerAlias('data.domains.*.domain'),
        ],
        update: [
            objectIdSanitizerAlias('data.id', false),
            noHtmlStringSanitizerAlias('data.lastName'),
            noHtmlStringSanitizerAlias('data.firstName'),
            noHtmlStringSanitizerAlias('data.nickname'),
            basicHtmlSanitizerAlias('data.description'),
            objectIdSanitizerAlias('data.occupations.*.skills.*'),
            objectIdSanitizerAlias('data.domains.*.domain'),
        ],
        delete: [],
        search: [],
        list: [],
        getinfo: [],
        getdoc: [],
    }
}
export {PersonsRoutes};
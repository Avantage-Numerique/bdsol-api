import express from "express";
import PersonsController from "@src/Persons/Controllers/PersonsController";
import AbstractController from "@core/Controller";
import CrudRoute from "@core/CrudRoute";
import {objectIdSanitizerAlias} from "@src/Security/SanitizerAliases/ObjectIdSanitizerAlias";
import {noHtmlStringSanitizerAlias} from "@src/Security/SanitizerAliases/NoHtmlStringSanitizerAlias";
import {basicHtmlSanitizerAlias} from "@src/Security/SanitizerAliases/BasicHtmlSanitizerAlias";

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
            noHtmlStringSanitizerAlias('data.catchphrase'),
            basicHtmlSanitizerAlias('data.description'),
            objectIdSanitizerAlias('data.occupations.*.skills.*'),
            objectIdSanitizerAlias('data.domains.*.domain'),
        ],
        update: [
            objectIdSanitizerAlias('data.id', false),
            noHtmlStringSanitizerAlias('data.lastName'),
            noHtmlStringSanitizerAlias('data.firstName'),
            noHtmlStringSanitizerAlias('data.nickname'),
            noHtmlStringSanitizerAlias('data.catchphrase'),
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
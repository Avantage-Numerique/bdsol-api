import express from "express";
import AbstractController from "@core/Controller";
import CrudRoute from "@core/CrudRoute";
import EquipmentsController from "@src/Equipments/Controllers/EquipmentsController";
import { basicHtmlSanitizerAlias } from "@src/Security/SanitizerAliases/BasicHtmlSanitizerAlias";
import { objectIdSanitizerAlias } from "@src/Security/SanitizerAliases/ObjectIdSanitizerAlias";
import { noHtmlStringSanitizerAlias } from "@src/Security/SanitizerAliases/NoHtmlStringSanitizerAlias";

class EquipmentsRoutes extends CrudRoute {

    controllerInstance: AbstractController = EquipmentsController.getInstance();
    routerInstance: express.Router = express.Router();
    routerInstanceAuthentification: express.Router = express.Router();

    middlewaresDistribution: any = {
        all: [],
        createUpdate: [],
        create: [
            noHtmlStringSanitizerAlias('data.equipementType'),
            noHtmlStringSanitizerAlias('data.label'),
            basicHtmlSanitizerAlias('data.description'),
            noHtmlStringSanitizerAlias('data.brand'),
            noHtmlStringSanitizerAlias('data.model'),
            objectIdSanitizerAlias('data.mainImage'),
            noHtmlStringSanitizerAlias('data.url')
        ],
        update: [
            objectIdSanitizerAlias('data.id', false),
            noHtmlStringSanitizerAlias('data.equipementType'),
            noHtmlStringSanitizerAlias('data.label'),
            basicHtmlSanitizerAlias('data.description'),
            noHtmlStringSanitizerAlias('data.brand'),
            noHtmlStringSanitizerAlias('data.model'),
            objectIdSanitizerAlias('data.mainImage'),
            noHtmlStringSanitizerAlias('data.url')
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

export {EquipmentsRoutes};
import express from "express";
import AbstractController from "@core/Controller";
import CrudRoute from "@core/CrudRoute";
import EquipmentController from "@src/Equipment/Controllers/EquipmentController";
import { basicHtmlSanitizerAlias } from "@src/Security/SanitizerAliases/BasicHtmlSanitizerAlias";
import { objectIdSanitizerAlias } from "@src/Security/SanitizerAliases/ObjectIdSanitizerAlias";
import { noHtmlStringSanitizerAlias } from "@src/Security/SanitizerAliases/NoHtmlStringSanitizerAlias";

class EquipmentRoutes extends CrudRoute {

    controllerInstance: AbstractController = EquipmentController.getInstance();
    routerInstance: express.Router = express.Router();
    routerInstanceAuthentification: express.Router = express.Router();

    middlewaresDistribution: any = {
        all: [],
        createUpdate: [],
        create: [
            objectIdSanitizerAlias('data.equipmentType'),
            noHtmlStringSanitizerAlias('data.label'),
            basicHtmlSanitizerAlias('data.description'),
            noHtmlStringSanitizerAlias('data.brand'),
            noHtmlStringSanitizerAlias('data.model'),
            objectIdSanitizerAlias('data.mainImage'),
            //noHtmlStringSanitizerAlias('data.url')
        ],
        update: [
            objectIdSanitizerAlias('data.id', false),
            objectIdSanitizerAlias('data.equipmentType'),
            noHtmlStringSanitizerAlias('data.label'),
            basicHtmlSanitizerAlias('data.description'),
            noHtmlStringSanitizerAlias('data.brand'),
            noHtmlStringSanitizerAlias('data.model'),
            objectIdSanitizerAlias('data.mainImage'),
            //noHtmlStringSanitizerAlias('data.url')
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

export default EquipmentRoutes;
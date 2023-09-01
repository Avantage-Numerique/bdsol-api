import express from "express";
import AbstractController from "@core/Controller";
import CrudRoute from "@core/CrudRoute";
import PlacesController from "@src/Places/Controllers/PlacesController";
import { basicHtmlSanitizerAlias } from "@src/Security/SanitizerAliases/BasicHtmlSanitizerAlias";
import { objectIdSanitizerAlias } from "@src/Security/SanitizerAliases/ObjectIdSanitizerAlias";
import { entityNameSanitizerAlias } from "@src/Security/SanitizerAliases/EntityNameSanitizerAlias";
import { noHtmlStringSanitizerAlias } from "@src/Security/SanitizerAliases/NoHtmlStringSanitizerAlias";

class PlacesRoutes extends CrudRoute {

    controllerInstance: AbstractController = PlacesController.getInstance();
    routerInstance: express.Router = express.Router();
    routerInstanceAuthentification: express.Router = express.Router();

    middlewaresDistribution: any = {
        all: [],
        createUpdate: [],
        create: [
            entityNameSanitizerAlias('data.name', false),
            objectIdSanitizerAlias('data.mainImage'),
            basicHtmlSanitizerAlias('data.description'),
            noHtmlStringSanitizerAlias('data.address'),
            noHtmlStringSanitizerAlias('data.city'),
            noHtmlStringSanitizerAlias('data.region'),
            noHtmlStringSanitizerAlias('data.mrc'),
            noHtmlStringSanitizerAlias('data.province'),
            noHtmlStringSanitizerAlias('data.postalCode'),
            noHtmlStringSanitizerAlias('data.country'),
            noHtmlStringSanitizerAlias('data.latitude'),
            noHtmlStringSanitizerAlias('data.longitude'),


        ],
        update: [
            objectIdSanitizerAlias('data.id', false),
            entityNameSanitizerAlias('data.name', false),
            objectIdSanitizerAlias('data.mainImage'),
            basicHtmlSanitizerAlias('data.description'),
            noHtmlStringSanitizerAlias('data.address'),
            noHtmlStringSanitizerAlias('data.city'),
            noHtmlStringSanitizerAlias('data.region'),
            noHtmlStringSanitizerAlias('data.mrc'),
            noHtmlStringSanitizerAlias('data.province'),
            noHtmlStringSanitizerAlias('data.postalCode'),
            noHtmlStringSanitizerAlias('data.country'),
            noHtmlStringSanitizerAlias('data.latitude'),
            noHtmlStringSanitizerAlias('data.longitude'),
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

export {PlacesRoutes};
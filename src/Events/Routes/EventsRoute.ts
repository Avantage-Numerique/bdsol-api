import express from "express";
import AbstractController from "@core/Controller";
import CrudRoute from "@core/CrudRoute";
import EventsController from "@src/Events/Controllers/EventsController";

class EventsRoutes extends CrudRoute {

    controllerInstance: AbstractController = EventsController.getInstance();
    routerInstance: express.Router = express.Router();
    routerInstanceAuthentification: express.Router = express.Router();

    middlewaresDistribution: any = {
        all: [],
        createUpdate: [],
        create: [],
        update: [],
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

export {EventsRoutes};
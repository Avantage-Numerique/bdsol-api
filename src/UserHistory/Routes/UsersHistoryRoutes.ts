import express from "express";
import {UsersHistoryController} from "../Controllers/UsersHistoryController";
import AbstractController from "../../Abstract/Controller";
import CrudRoute from "../../Abstract/CrudRoute";

class UsersHistoryRoutes extends CrudRoute {
    controllerInstance: AbstractController = UsersHistoryController.getInstance();
    routerInstance: express.Router = express.Router();
    routerInstanceAuthentification: express.Router = express.Router();

    middlewaresDistribution:any = {
        all: [],
        createUpdate: [],
        create: [],
        update: [],
        delete: [],
        search: [],
        list: [],
        getinfo: [],
        getdoc: [],
    }


    public setupAdditionnalPublicRoutes(router: express.Router) {

        //  GET
        //disabling this from the default Route class, because this take advantage on what's in the route object
        router.get('/:slug', [
            this.disabledRouteHandler.bind(this)
        ]);

        return router;
    }
}
export {UsersHistoryRoutes};
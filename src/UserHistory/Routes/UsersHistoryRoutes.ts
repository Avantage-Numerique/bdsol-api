import express from "express";
import {UsersHistoryController} from "../Controllers/UsersHistoryController";
import AbstractRoute from "../../Abstract/Route";
import AbstractController from "../../Abstract/Controller";

class UsersHistoryRoutes extends AbstractRoute {
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
}
export {UsersHistoryRoutes};
import express from "express";
import {UsersController} from "../Controllers/UsersController";
import AbstractRoute from "../../Abstract/Route";
import AbstractController from "../../Abstract/Controller";

class UsersRoutes extends AbstractRoute {
    controllerInstance: AbstractController = UsersController.getInstance();
    routerInstance: express.Router = express.Router();
    routerInstanceAuthentification: express.Router = express.Router();


    middlewaresDistribution:any = {
        all: [],
        create: [],
        update: [],
        delete: [],
        search: [],
        list: [],
        getinfo: [],
        getdoc: [],
    }
}
export {UsersRoutes};
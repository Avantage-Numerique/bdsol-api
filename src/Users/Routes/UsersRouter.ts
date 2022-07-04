import express from "express";
import {UsersController} from "../Controllers/UsersController";
import AbstractRoute from "../../Abstract/Route";
import AbstractController from "../../Abstract/Controller";

class UsersRoutes extends AbstractRoute {
    controllerInstance: AbstractController = UsersController.getInstance();
    routerInstance: express.Router = express.Router();
}
export {UsersRoutes};
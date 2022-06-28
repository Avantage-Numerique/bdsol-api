import express from "express";
import {PersonnesController} from "../Controllers/PersonnesController";
import AbstractRoute from "../../Abstract/Route";
import AbstractController from "../../Abstract/Controller";


/**
 * Initiate the routes
 */
class PersonnesRoutes extends AbstractRoute {
    controllerInstance: AbstractController = PersonnesController.getInstance();
    routerInstance: express.Router = express.Router();
}


export {PersonnesRoutes};
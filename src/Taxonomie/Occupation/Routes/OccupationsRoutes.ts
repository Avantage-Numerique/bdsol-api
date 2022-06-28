import express from "express";
import {OccupationsController} from "../Controllers/OccupationsController";
import AbstractRoute from "../../../Abstract/Route";
import AbstractController from "../../../Abstract/Controller";

class OccupationsRoutes extends AbstractRoute {
    controllerInstance: AbstractController = OccupationsController.getInstance();
    routerInstance: express.Router = express.Router();
}

export {OccupationsRoutes};
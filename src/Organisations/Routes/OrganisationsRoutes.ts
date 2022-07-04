import express from "express";
import OrganisationsController from "../Controllers/OrganisationsController";
import AbstractRoute from "../../Abstract/Route";
import AbstractController from "../../Abstract/Controller";

class OrganisationsRoutes extends AbstractRoute {
    controllerInstance: AbstractController = OrganisationsController.getInstance();
    routerInstance: express.Router = express.Router();
}
export {OrganisationsRoutes};

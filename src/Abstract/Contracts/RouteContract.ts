import type AbstractController from "../Controller";
import type {Router} from "express";

export interface RouteContract {
    controllerInstance: AbstractController;
    routerInstance: Router;
    routerInstanceAuthentification: Router;
    middlewaresDistribution: any;

    setupAuthRoutes(): Router;
    setupPublicRoutes(): Router;
    addMiddlewares(route:string, middlewares:string): Array<any>;
}
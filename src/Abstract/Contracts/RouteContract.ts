import type AbstractController from "../Controller";
import type {Router} from "express";
import {ControllerContract} from "./ControllerContract";

export interface RouteContract {
    controllerInstance: ControllerContract;
    routerInstance: Router;
    routerInstanceAuthentification: Router;
    middlewaresDistribution: any;

    setupAuthRoutes(): Router;
    setupPublicRoutes(): Router;
    addMiddlewares(route:string, middlewares:string): Array<any>;
}
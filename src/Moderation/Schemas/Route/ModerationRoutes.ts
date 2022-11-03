import { RouteContract } from "../../../Abstract/Contracts/RouteContract";
import AbstractRoute from "../../../Abstract/Route";




class ModerationRoute extends AbstractRoute implements RouteContract {

    controllerInstance: AbstractController;
    routerInstance: Router;
    routerInstanceAuthentification: Router;
    middlewaresDistribution: any;

    setupAuthRoutes(): Router;
    setupPublicRoutes(): Router;
    addMiddlewares(route:string, middlewares:string): Array<any>;

}
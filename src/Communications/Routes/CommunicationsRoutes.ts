import express from "express";
import {body} from "express-validator";
import {NoHtmlSanitizer} from "../../Security/Sanitizers/NoHtmlSanitizer";
import CommunicationsController from "../Controllers/CommunicationsController";
import AbstractRoute from "@src/Abstract/Route";
import {RouteContract} from "@src/Abstract/Contracts/RouteContract";
import {NextFunction, Request, Response} from "express-serve-static-core";
import {Service} from "@src/Database/DatabaseDomain";
import {entityNameSanitizerAlias} from "@src/Security/SanitizerAliases/EntityNameSanitizerAlias";
import {basicHtmlSanitizerAlias} from "@src/Security/SanitizerAliases/BasicHtmlSanitizerAlias";

class CommunicationsRoutes extends AbstractRoute implements RouteContract {

    controllerInstance:any = CommunicationsController.getInstance();
    routerInstance: express.Router = express.Router();
    routerInstanceAuthentification: express.Router = express.Router();

    defaultMiddlewaresDistribution: any;
    middlewaresDistribution:any = {
        all: [],
        createUpdate: [],
        create: [
            entityNameSanitizerAlias('data.name'),
            basicHtmlSanitizerAlias('data.message'),
            body('data.email').exists({checkFalsy:true}).bail()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .normalizeEmail()
                .trim(),
        ],
        update: [],
        delete: [],
        search: [],
        list: [],
        getinfo: [],
        getdoc: [],
    }

    /**
     * Add middleware from target array into the middlewares space in route declaration.
     * @param route {string} the route / property of the middlewares array to push into middleware for this.
     * @param middlewares {string} Not used yet.
     */
    public addMiddlewares(route:string, middlewares:string = ""):Array<any>
    {
        return this.middlewaresDistribution[route] ?? [];
    }

    setupAuthRoutes(): express.Router {
        return this.setupAdditionnalAuthRoutes(this.routerInstanceAuthentification);
    }
    setupAdditionnalAuthRoutes(router: express.Router): express.Router {
        return router;
    }

    setupPublicRoutes(): express.Router {
        this.routerInstance.post('/contact-us', [
            ...this.addMiddlewares("create"),
            this.validatingResults.bind(this),
            this.contactUsHandler.bind(this),
            this.routeSendResponse.bind(this),
        ]);
        this.routerInstance.post('/report', [
            ...this.addMiddlewares("create"),
            this.validatingResults.bind(this),
            this.reportEntityHandler.bind(this),
            this.routeSendResponse.bind(this),
        ]);
        return this.setupAdditionnalPublicRoutes(this.routerInstance);
    }
    setupAdditionnalPublicRoutes(router: express.Router): express.Router {
        return router;
    }

    /**
     * createContactUsHandler
     * Handle the create contact-us communication, passing the data to the controller.
     * @param req {Request}
     * @param res {Response}
     * @param next {NextFunction}
     * @return {Promise<any>}
     */
    public async contactUsHandler(req: Request, res: Response, next: NextFunction): Promise<any> {
        res.serviceResponse = await this.controllerInstance.createContactUs(req.body.data);
        res.serviceResponse.action = Service.CREATE_STATE;
        return next();
    }
    /**
     * reportEntityHandler
     * Handle the create contact-us communication, passing the data to the controller.
     * @param req {Request}
     * @param res {Response}
     * @param next {NextFunction}
     * @return {Promise<any>}
     */
    public async reportEntityHandler(req: Request, res: Response, next: NextFunction): Promise<any> {
        console.log("Allo")
        console.log("Allo")
        console.log("Allo")
        console.log("Allo")
        res.serviceResponse = await this.controllerInstance.createReportEntity(req.body.data, req.user?._id, req.visitor.ip);
        res.serviceResponse.action = Service.CREATE_STATE;
        return next();
    }

}
export default CommunicationsRoutes;
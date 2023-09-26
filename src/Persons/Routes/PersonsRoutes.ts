import express, {NextFunction, Request, Response} from "express";
import PersonsController from "@src/Persons/Controllers/PersonsController";
import AbstractController from "@core/Controller";
import CrudRoute from "@core/CrudRoute";
import {objectIdSanitizerAlias} from "@src/Security/SanitizerAliases/ObjectIdSanitizerAlias";
import {noHtmlStringSanitizerAlias} from "@src/Security/SanitizerAliases/NoHtmlStringSanitizerAlias";
import {basicHtmlSanitizerAlias} from "@src/Security/SanitizerAliases/BasicHtmlSanitizerAlias";

class PersonsRoutes extends CrudRoute {

    controllerInstance: AbstractController = PersonsController.getInstance();
    routerInstance: express.Router = express.Router();
    routerInstanceAuthentification: express.Router = express.Router();

    middlewaresDistribution:any = {
        all: [],
        createUpdate: [],
        create: [
            noHtmlStringSanitizerAlias('data.lastName', false),
            noHtmlStringSanitizerAlias('data.firstName', false),
            noHtmlStringSanitizerAlias('data.nickname'),
            basicHtmlSanitizerAlias('data.description'),
            objectIdSanitizerAlias('data.occupations.*.skills.*'),
            objectIdSanitizerAlias('data.domains.*.domain'),
        ],
        update: [
            objectIdSanitizerAlias('data.id', false),
            noHtmlStringSanitizerAlias('data.lastName'),
            noHtmlStringSanitizerAlias('data.firstName'),
            noHtmlStringSanitizerAlias('data.nickname'),
            basicHtmlSanitizerAlias('data.description'),
            objectIdSanitizerAlias('data.occupations.*.skills.*'),
            objectIdSanitizerAlias('data.domains.*.domain'),
        ],
        delete: [],
        search: [],
        list: [],
        getinfo: [],
        getdoc: [],
    }

    /**
     * Route handler to transform all the URI params into query to the get
     * @param req {Request}
     * @param res {Response}
     * @param next {NextFunction}
     */
    public async getByUriParamsHandler(req: Request, res: Response, next: NextFunction): Promise<any> {
        // this may be overkill, because req.params already get all the same structure.
        const initialQuery: any = {};
        for (const param in req.params) {
            initialQuery[param] = req.params[param];
        }
        console.log("this is my route.");
        res.serviceResponse = await this.controllerInstance.get(initialQuery);
        return next();
    }

    public setupAdditionnalPublicRoutes(router: express.Router):express.Router {
        // Set the /:slug handler at the end of other route, to allow the routes sets in setupAdditionnalPublicRoutes to be 1 in priority.
        this.routerInstance.get('/agg/:slug', [
            this.getPersonsOrganisationsHandler.bind(this),
            this.routeSendResponse.bind(this),
        ]);
        return router;
    }

    public async getPersonsOrganisationsHandler(req: Request, res: Response, next: NextFunction): Promise<any> {

        if (req.params.slug) {
            const personsController:PersonsController = PersonsController.getInstance() as PersonsController;
            res.serviceResponse = await personsController.aggregateOrgs(req.params.slug);
        }

        return next();
    }

}
export {PersonsRoutes};
import express, {NextFunction, Request, Response} from "express";
import CrudRoute from "../../Abstract/CrudRoute";
import {param} from "express-validator";
import TaxonomyController from "../Controllers/TaxonomyController";
import AbstractController from "@core/Controller";
import {NoHtmlSanitizer} from "@src/Security/Sanitizers/NoHtmlSanitizer";
import {NoAccentSanitizer} from "@src/Security/Sanitizers/NoAccentSanitizer";
import {NoSpaceSanitizer} from "@src/Security/Sanitizers/NoSpaceSanitizer";
import {EnumSanitizer} from "@src/Security/Sanitizers/EnumSanitizer";
import {TaxonomiesCategoriesEnum} from "../TaxonomiesCategoriesEnum";
import {isInEnumSanitizerAlias} from "@src/Security/SanitizerAliases/IsInEnumSanitizerAlias";
import {noHtmlStringSanitizerAlias} from "@src/Security/SanitizerAliases/NoHtmlStringSanitizerAlias";
import {objectIdSanitizerAlias} from "@src/Security/SanitizerAliases/ObjectIdSanitizerAlias";

class TaxonomyRoutes extends CrudRoute {

    controllerInstance: AbstractController = TaxonomyController.getInstance();
    routerInstance: express.Router = express.Router();
    routerInstanceAuthentification: express.Router = express.Router();

    middlewaresDistribution: any = {
        all: [],
        create: [
            isInEnumSanitizerAlias('data.category', TaxonomiesCategoriesEnum),
            noHtmlStringSanitizerAlias('data.name'),
            noHtmlStringSanitizerAlias('data.description'),
            noHtmlStringSanitizerAlias('data.source'),
            noHtmlStringSanitizerAlias('data.addReason'),
        ],
        createUpdate: [],
        update: [
            objectIdSanitizerAlias('data.id', false),
            isInEnumSanitizerAlias('data.category', TaxonomiesCategoriesEnum),
            noHtmlStringSanitizerAlias('data.name'),
            noHtmlStringSanitizerAlias('data.description'),
            noHtmlStringSanitizerAlias('data.source'),
            noHtmlStringSanitizerAlias('data.addReason'),
        ],
        delete: [],
        search: [],
        list: [],
        getinfo: [],
        getdoc: [],
        byTaxonomy: [
            param('category')
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .customSanitizer(EnumSanitizer.validatorCustomSanitizer(TaxonomiesCategoriesEnum))
                .customSanitizer(NoAccentSanitizer.validatorCustomSanitizer())
                .customSanitizer(NoSpaceSanitizer.validatorCustomSanitizer())
                .stripLow()
                .trim()
                .customSanitizer(EnumSanitizer.validatorCustomSanitizer(TaxonomiesCategoriesEnum))
        ]
    }


    public setupAdditionnalPublicRoutes(router: express.Router) {

        router.post('/supported', [
            ...this.addMiddlewares("all"),
            this.getTaxonomiesHanlder.bind(this),
            this.routeSendResponse.bind(this)
        ]);

        router.post('/group/skills', [
            ...this.addMiddlewares("all"),
            this.getByTaxonomyGroup.bind(this),
            this.routeSendResponse.bind(this)
        ]);

        //  GET

        router.get('/:category/:slug', [
            ...this.addMiddlewares("all"),
            ...this.addMiddlewares("byTaxonomy"),
            ...this.addMiddlewares("bySlug"),
            this.getByUriParamsHandler.bind(this),
            this.routeSendResponse.bind(this)
        ]);

        router.get('/:category/:id', [
            ...this.addMiddlewares("all"),
            ...this.addMiddlewares("byTaxonomy"),
            ...this.addMiddlewares("bySlug"),
            this.getByUriParamsHandler.bind(this),
            this.routeSendResponse.bind(this)
        ]);

        router.get('/:category', [
            ...this.addMiddlewares("all"),
            ...this.addMiddlewares("byTaxonomy"),
            this.listByUriParamsHandler.bind(this),
            this.routeSendResponse.bind(this)
        ]);

        router.get('/:category/:slug/count', [
            ...this.addMiddlewares("all"),
            ...this.addMiddlewares("byTaxonomy"),
            ...this.addMiddlewares("bySlug"),
            this.countHandler.bind(this),
            this.routeSendResponse.bind(this)
        ]);

        return router;
    }

    public setupAdditionnalAuthRoutes(router: express.Router): express.Router {

        router.post('/:category', [
            ...this.addMiddlewares("all"),
            ...this.addMiddlewares("byTaxonomy"),
            this.listByUriParamsHandler.bind(this),
            this.routeSendResponse.bind(this)
        ]);

        return router;
    }


    /**
     * List all the taxonomy's categories set in the enum via the TaxonomyController.getTaxonomies
     * @param req {Request}
     * @param res {Response}
     * @param next {NextFunction}
     */
    public async getTaxonomiesHanlder(req: Request, res: Response, next: NextFunction): Promise<any> {
        res.serviceResponse = TaxonomyController.getTaxonomies();
        return next();
    }

    /**
     * List taxonomies that are allowed in skills or skills group (skills, technologies ...)
     * @param req {Request}
     * @param res {Response}
     * @param next {NextFunction}
     */
    public async getByTaxonomyGroup(req: Request, res: Response, next: NextFunction): Promise<any> {
        req.body.data.category = `in:${TaxonomiesCategoriesEnum.Skills},${TaxonomiesCategoriesEnum.Technology},${TaxonomiesCategoriesEnum.Domains}`;
        const listByGroupSkills = await this.controllerInstance.list(req.body.data);
        res.serviceResponse = listByGroupSkills;
        return next();
    }

}

export {TaxonomyRoutes};
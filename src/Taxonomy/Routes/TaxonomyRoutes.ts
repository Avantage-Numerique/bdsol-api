import express, {Response, Request, NextFunction} from "express";
import TaxonomyController from "../Controllers/TaxonomyController";
import AbstractController from "../../Abstract/Controller";
import {body, param} from "express-validator";
import {NoHtmlSanitizer} from "../../Security/Sanitizers/NoHtmlSanitizer";
import {HtmlSanitizer} from "../../Security/Sanitizers/HtmlSanitizer";
import {NoAccentSanitizer} from "../../Security/Sanitizers/NoAccentSanitizer";
import {NoSpaceSanitizer} from "../../Security/Sanitizers/NoSpaceSanitizer";
import {EnumSanitizer} from "../../Security/Sanitizers/EnumSanitizer";
import {TaxonomiesCategoriesEnum} from "../TaxonomiesCategoriesEnum";
import CrudRoute from "../../Abstract/CrudRoute";

class TaxonomyRoutes extends CrudRoute {

    controllerInstance: AbstractController = TaxonomyController.getInstance();
    routerInstance: express.Router = express.Router();
    routerInstanceAuthentification: express.Router = express.Router();

    middlewaresDistribution: any = {
        all: [],
        create: [
            body('data.category')
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .customSanitizer(EnumSanitizer.validatorCustomSanitizer(TaxonomiesCategoriesEnum))
                .stripLow()
                .trim(),
            //I remove espace() sanitizer here, because I didn't find any way yet to handle the unescape method for each of those field.
            body('data.name')
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .trim(),
            body('data.slug').optional().bail()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()//only alpha num acii beteween 32 and 13-ish
                .trim(),//no space
            body('data.description').optional().bail()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .trim(),
            body('data.source').optional().bail()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .trim(),
            body('data.addReason').optional().bail()
                .customSanitizer(HtmlSanitizer.validatorCustomSanitizer())
                .trim()
        ],
        createUpdate: [],
        update: [
            body('data.category').optional().bail()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .customSanitizer(EnumSanitizer.validatorCustomSanitizer(TaxonomiesCategoriesEnum))
                .stripLow()
                .trim(),
            //I remove espace() sanitizer here, because I didn't find any way yet to handle the unescape method for each of those field.
            body('data.name').optional().bail()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .trim(),
            /*body('data.slug').optional()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()//only alpha num acii beteween 32 and 13-ish
                .trim(),//no space*/
            body('data.description').optional().bail()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .trim(),
            body('data.source').optional().bail()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .trim(),
            body('data.addReason').optional().bail()
                .customSanitizer(HtmlSanitizer.validatorCustomSanitizer())
                .trim()
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


}

export {TaxonomyRoutes};
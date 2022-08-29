import express, {Response, Request} from "express";
import {TaxonomyController} from "../Controllers/TaxonomyController";
import AbstractRoute from "../../Abstract/Route";
import AbstractController from "../../Abstract/Controller";
import {body, param} from "express-validator";
import {NoHtmlSanitizer} from "../../Security/Sanitizers/NoHtmlSanitizer";
import {HtmlSanitizer} from "../../Security/Sanitizers/HtmlSanitizer";
import {ApiResponseContract} from "../../Http/Responses/ApiResponse";
import {NoAccentSanitizer} from "../../Security/Sanitizers/NoAccentSanitizer";
import {NoSpaceSanitizer} from "../../Security/Sanitizers/NoSpaceSanitizer";
import {EnumSanitizer} from "../../Security/Sanitizers/EnumSanitizer";
import {TaxonomiesCategories} from "../TaxonomiesEnum";

class TaxonomyRoutes extends AbstractRoute {
    controllerInstance: AbstractController = TaxonomyController.getInstance();
    routerInstance: express.Router = express.Router();
    routerInstanceAuthentification: express.Router = express.Router();

    middlewaresDistribution: any = {
        all: [],
        create: [
            /*body('data.category')
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .trim(),*/
            //I remove espace() sanitizer here, because I didn't find any way yet to handle the unescape method for each of those field.
            body('data.name')
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .trim(),
            /*body('data.slug')
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()//only alpha num acii beteween 32 and 13-ish
                .trim(),//no space*/
            body('data.description')
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .trim(),
            body('data.source')
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .trim(),
            body('data.addReason')
                .customSanitizer(HtmlSanitizer.validatorCustomSanitizer())
                .trim()
        ],
        createUpdate: [],
        update: [],
        delete: [],
        search: [],
        list: [],
        getinfo: [],
        getdoc: [],
        byTaxonomy: [
            param('taxonomy')
                .customSanitizer(NoAccentSanitizer.validatorCustomSanitizer())
                .customSanitizer(NoSpaceSanitizer.validatorCustomSanitizer())
                .stripLow()
                .trim()
                .customSanitizer(EnumSanitizer.validatorCustomSanitizer(TaxonomiesCategories))
        ]
    }

    public setupAdditionnalPublicRoutes(router: express.Router) {

        router.post('/supported', [
            ...this.addMiddlewares("all"),
            this.getTaxonomiesHanlder.bind(this)
        ]);

        //  GET

        router.get('/:taxonomy/:slug', [
            ...this.addMiddlewares("all"),
            ...this.addMiddlewares("byTaxonomy"),
            ...this.addMiddlewares("bySlug"),
            this.getTargetTaxonomyHandler.bind(this)
        ]);

        router.get('/:taxonomy', [
            ...this.addMiddlewares("all"),
            ...this.addMiddlewares("byTaxonomy"),
            this.listTargetTaxonomyHandler.bind(this)
        ]);

        return router;
    }


    public async getTaxonomiesHanlder(req: Request, res: Response): Promise<any> {
        const response: ApiResponseContract = TaxonomyController.getTaxonomies();
        return res.status(response.code).send(response);
    }


    public async listTargetTaxonomyHandler(req: Request, res: Response): Promise<any> {
        const { taxonomy } = req.params;

        const response: ApiResponseContract = await this.controllerInstance.list({category:taxonomy});
        return res.status(response.code).send(response);
    }


    public async getTargetTaxonomyHandler(req: Request, res: Response): Promise<any> {
        const { taxonomy, slug } = req.params;

        const response: ApiResponseContract = await this.controllerInstance.list({category:taxonomy, slug:slug});
        return res.status(response.code).send(response);
    }

}

export {TaxonomyRoutes};
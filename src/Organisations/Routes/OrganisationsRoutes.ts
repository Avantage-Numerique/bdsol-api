import express from "express";
import OrganisationsController from "../Controllers/OrganisationsController";
import AbstractRoute from "../../Abstract/Route";
import AbstractController from "../../Abstract/Controller";
import {body} from "express-validator";
import {HtmlSanitizer} from "../../Security/Sanitizers/HtmlSanitizer";

class OrganisationsRoutes extends AbstractRoute {
    controllerInstance: AbstractController = OrganisationsController.getInstance();
    routerInstance: express.Router = express.Router();
    routerInstanceAuthentification: express.Router = express.Router();

    middlewaresDistribution:any = {
        all: [
            body('data.name').customSanitizer(HtmlSanitizer.noHtml()).trim(),
            //I remove espace() sanitizer here, because I didn't find any way yet to handle the unescape method for each of those field.
            body('data.description').customSanitizer(HtmlSanitizer.richText()).trim(),
            body('data.url').customSanitizer(HtmlSanitizer.noHtml()).trim(),
            body('data.contactPoint').customSanitizer(HtmlSanitizer.noHtml()).trim(),
            body('data.fondationDate').customSanitizer(HtmlSanitizer.noHtml()).trim().toDate(),
        ],
        create: [],
        update: [],
        delete: [],
        search: [],
        list: [],
        getinfo: [],
        getdoc: [],
    }
}
export {OrganisationsRoutes};

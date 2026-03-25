import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ReferentialController from "../Controllers/ReferentialController";

import { refData } from "@ref/Data/data";
import { findEntityByURL } from "@ref/Data/utils";
import { JsonLDBuilder } from "@src/jsonld/JsonLDBuilder";
import { refPerson } from "../Data/Entities/RefPerson";
import Person from "@src/Persons/Models/Person";
import Project from "@src/Projects/Models/Project";
import { refProject } from "../Data/Entities/RefProject";

class ReferentialRoutes {
    public routerInstance: express.Router;
    public routerInstanceAuthentification: express.Router;
    public controllerInstance: ReferentialController = ReferentialController.getInstance();

    constructor() {
        this.routerInstance = express.Router();
        this.routerInstanceAuthentification = express.Router();
    }

    /**
     * Public routes init
     * Setup all the endpoint that can be reachable when no token is added to the header (public)
     * @return {express.Router} router for the public routes
     * @public @method
     */
    public setupPublicRoutes(): express.Router {
        this.routerInstance.get("/", [this.getRefIndexHandler.bind(this)]);
        this.routerInstance.get("/primitives", [this.getRefPrimitiveHandler.bind(this)]);
        this.routerInstance.get("/:entity", [this.getRefEntityHandler.bind(this)]);
        this.routerInstance.get("/jsonld/:entity", [this.getJsonLDEntityHandler.bind(this)]);
        return this.routerInstance;
    }

    public setupAuthRoutes(): express.Router {
        return this.routerInstance;
    }

    /**
     *
     * @param req {Request}
     * @param res {Response}
     * @return {Promise<any>}
     */
    public async getRefIndexHandler(req: Request, res: Response): Promise<any> {
        if ("json" in req.query) {
            res.set("Content-Type", "application/json");

            return res.status(StatusCodes.OK).send(refData);
        }

        res.set("Content-Type", "text/html");
        return res.status(StatusCodes.OK).send(await this.controllerInstance.referentialLayout());
    }

    /**
     *
     * @param req {Request}
     * @param res {Response}
     * @return {Promise<any>}
     */
    public async getRefEntityHandler(req: Request, res: Response): Promise<any> {
        const { params } = req;

        if ("json" in req.query) {
            res.set("Content-Type", "application/json");

            return res.status(StatusCodes.OK).send(findEntityByURL(params.entity.toLowerCase()));
        }

        res.set("Content-Type", "text/html");
        return res
            .status(StatusCodes.OK)
            .send(await this.controllerInstance.referentialSingleEntityLayout(params.entity.toLowerCase()));
    }

    /**
     *
     * @param req {Request}
     * @param res {Response}
     * @return {Promise<any>}
     */
    public async getRefPrimitiveHandler(req: Request, res: Response): Promise<any> {
        const { params } = req;

        // TODO: clarifier le comportement en mode JSON
        // if ("json" in req.query) {
        //     res.set("Content-Type", "application/json");

        //     return res.status(StatusCodes.OK).send(findEntityByURL(params.type.toLowerCase()));
        // }

        res.set("Content-Type", "text/html");
        return res.status(StatusCodes.OK).send(await this.controllerInstance.referentialPrimitivesLayout());
    }

    public async getJsonLDEntityHandler(req: Request, res: Response): Promise<any> {
        let id = "664254ddb53eedd349f9ec07";
        let person = await Project.getInstance().mongooseModel.findById(id).setOptions({ skipPopulate: true });
        const entity = {
            _id: { $oid: "68c313c732da684859a24643" },
            lastName: "Le ballon poire",
            firstName: "Jean-Guy",
            nickname: "",
            description:
                "<h1><strong>Poteau</strong></h1><p>C'est un beau poteau les <em>amigos</em></p><ol><li><em>Oui</em></li><li><em>Non</em></li><li>Pas en italique</li><li><strong>En gras</strong></li></ol><h2>Croissant</h2><p>C'est un croissant des plus beaux je dois, rajouter un peu de caractère pour dépasser la limite de 160 et voir si la short description l'inscrit correctement. Sinon c'est méga bozo.</p>",
            occupations: [
                {
                    groupName: "Le poteau de ballon-poire",
                    skills: [{ $oid: "664254d8b53eedd349f9e937" }, { $oid: "664254dab53eedd349f9eb1f" }],
                    subMeta: { order: 0 },
                },
                {
                    groupName: "J'apprend profondément",
                    skills: [{ $oid: "664254d9b53eedd349f9e9eb" }],
                    subMeta: { order: 1 },
                },
            ],
            domains: [
                { domain: { $oid: "664254d9b53eedd349f9ea0b" } },
                { domain: { $oid: "664254d9b53eedd349f9ea33" } },
            ],
            catchphrase: "",
            contactPoint: {
                email: { address: "mon-ballon.poire@gmail.courriel" },
                tel: { num: "819-222-2223", ext: "#52" },
                website: { url: "www.ballonpeter.com" },
            },
            url: [
                {
                    label: "Coup dûr pour le joueur français",
                    url: "www.coupdurpourlejoueurfrancais.fr",
                    subMeta: { order: 0 },
                },
            ],
            region: "baies-james",
            badges: ["CB"],
            meta: { state: "pending", lastModifiedBy: { $oid: "664254dbb53eedd349f9eb58" } },
            createdAt: { $date: "2025-09-11T18:24:07.076Z" },
            updatedAt: { $date: "2026-03-18T19:56:51.430Z" },
            slug: "jean-guy-le-ballon-poire",
            __v: 0,
            shortDescription:
                "C'est juste un champ texte ordinaire sérieux. Pourquoi est-ce que c'est surrérogatoire? Pis d'ailleurs, qu'est-ce que veux dire \"surrérogatoire\" anyways...",
        };
        const ref = refProject;
        const options = {
            contextMode: "inline", // | "url";
            contextUrl: "/ref",
        } as const;

        const jsonld = new JsonLDBuilder(person, ref, options);

        res.set("Content-Type", "application/json");
        return res.status(StatusCodes.OK).send(jsonld.build());
    }
}
export default ReferentialRoutes;

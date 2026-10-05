import config from "@src/config";
import { getTemplateBaseData } from "@src/Templates/Emails/EmailData";
import PublicTemplate from "@src/Templates/PublicTemplate";
import DefaultEmailTheme from "@src/Templates/Themes/DefaultEmailTheme";
import { refData } from "@ref/Data/data";
import { getAllUniquePrimitives } from "@ref/Data/utils";
import { PublicRoute } from "@src/Pages/Types/PublicRoute";
import { RefProperty } from "@ref/Data/types";

class ReferentialController {
    /** @private @static Singleton instance */
    private static _instance: ReferentialController;

    private _routes;

    protected _baseRoute: string = "/ref";

    private constructor() {
        this._routes = this.mapRefRoutes();
    }

    private mapRefRoutes() {
        const routesMap: Map<string, RefProperty> = new Map();

        Object.values(refData)
            .flatMap((x) => Object.values(x))
            .forEach((v) => {
                if (v.url) routesMap.set(v.url.toLowerCase(), v);
            });

        return routesMap;
    }

    /**
     * @public @static @method getInstance Create the singleton instance if not existing
     * @return {ReferentialController} Controller singleton constructor
     */
    public static getInstance(): ReferentialController {
        if (!ReferentialController._instance) {
            ReferentialController._instance = new ReferentialController();
        }
        return ReferentialController._instance;
    }

    public async referentialLayout(route: PublicRoute = {}): Promise<string> {
        const baseData = getTemplateBaseData();

        const index = new PublicTemplate("referential"); //tempalte have already a default in the EmailContent.Prepare.

        const title: string = `Référentiel`;

        const entityRoute = `${this._baseRoute}`;

        const metaTitle: string = `${title} &rarr; ${config.appName}`;

        return await index.render({
            context: {
                ...baseData, //basic app and api default string and links
                ...DefaultEmailTheme, //basic theme for colors and sizes.
                title: `${title}`,

                baseRoute: "/ref",

                items: refData,
                route: {
                    ...route,
                },
                meta: {
                    title: `${metaTitle}`,
                    // description: `${body}`,
                    author: `${config.appName}`,
                },
            },
        });
    }

    public async referentialSingleEntityLayout(entity: string, route: PublicRoute = {}): Promise<string> {
        const baseData = getTemplateBaseData();

        const index = new PublicTemplate("referentialSingle"); //tempalte have already a default in the EmailContent.Prepare.

        const entityRoute = `${this._baseRoute}/${entity}`;

        const entityData = this._routes.get(`/${entity}`);

        const title: string = `${entityData?.label}`; // <small><code>${entityData?.ontologyProperty}</code></small>`Référentiel de ${config.appName} &rarr; <code>${entityRoute}</code>`;
        const metaTitle: string = `${entity} &rarr; ${entityData?.ontologyProperty} &rarr; Référentiel ${config.appName}`;

        return await index.render({
            context: {
                ...baseData, //basic app and api default string and links
                ...DefaultEmailTheme, //basic theme for colors and sizes.
                title: `${title}`,
                // body: `${body}`,

                baseUrl: config.baseUrl,
                baseRoute: this._baseRoute,
                entityRoute: entityRoute,

                item: entityData,
                entity: entity,

                route: {
                    ...route,
                },
                meta: {
                    title: `${metaTitle}`,
                    // description: `${body}`,
                    author: `${config.appName}`,
                },
            },
        });
    }
    public async referentialVocabulariesLayout(entity?: string, route: PublicRoute = {}): Promise<string> {
        const baseData = getTemplateBaseData();

        const index = new PublicTemplate("referentialSingleVocabulary"); //tempalte have already a default in the EmailContent.Prepare.
        const entityRoute = `${this._baseRoute}/vocabularies/${entity}`;

        const entityData = this._routes.get(`/vocabularies/${entity}`);

        const title: string = `${entityData?.label}`;
        //const title: string = `Vocabulaire controlé de ${config.appName} &rarr; <code>/ref/${entity}</code>`;
        const metaTitle: string = `${entity} &rarr; ${entityData?.ontologyProperty} &rarr; Référentiel ${config.appName}`;

        return await index.render({
            context: {
                ...baseData, //basic app and api default string and links
                ...DefaultEmailTheme, //basic theme for colors and sizes.
                title: `${title}`,
                // body: `${body}`,

                baseUrl: config.baseUrl,
                baseRoute: this._baseRoute,

                item: entityData,
                entity: entity,
                entityRoute: entityRoute,

                route: {
                    ...route,
                },

                meta: {
                    title: `${metaTitle}`,
                    // description: `${body}`,
                    author: `${config.appName}`,
                },
            },
        });
    }

    public async referentialPrimitivesLayout(route: PublicRoute = {}): Promise<string> {
        const baseData = getTemplateBaseData();

        const index = new PublicTemplate("referentialPrimitives"); //tempalte have already a default in the EmailContent.Prepare.

        const title: string = `Liste des propriétés`;
        const metaTitle: string = `Liste des propriétés &rarr; &rarr; Référentiel &rarr; ${config.appName}`;

        return await index.render({
            context: {
                ...baseData, //basic app and api default string and links
                ...DefaultEmailTheme, //basic theme for colors and sizes.
                title: `${title}`,

                baseUrl: config.baseUrl,
                baseRoute: this._baseRoute,

                items: getAllUniquePrimitives(Object.values(refData).flatMap((item) => Object.values(item))),

                route: {
                    ...route,
                },
                meta: {
                    title: `${metaTitle}`,
                    // description: `${body}`,
                    author: `${config.appName}`,
                },
            },
        });
    }
}

export default ReferentialController;

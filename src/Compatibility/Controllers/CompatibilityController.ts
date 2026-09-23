import config from "@src/config";
import { getTemplateBaseData } from "@src/Templates/Emails/EmailData";
import PublicTemplate from "@src/Templates/PublicTemplate";
import DefaultEmailTheme from "@src/Templates/Themes/DefaultEmailTheme";
import { refData } from "@ref/Data/data";
import { getAllUniquePrimitives } from "@ref/Data/utils";
import { PublicRoute } from "@src/Pages/Types/PublicRoute";
import { compatibilityData, ontologiesMetaData } from "@src/Compatibility/CompatibilityObject";
import { Str } from "@src/Helpers/Str";

class CompatibilityController {
    /** @private @static Singleton instance */
    private static _instance: CompatibilityController;

    private _routes;

    protected _baseRoute: string = "/compatibility";

    private constructor() {
        this._routes = this.mapCompatibilityRoutes();
    }

    private mapCompatibilityRoutes() {
        let routesMap: Map<string, Record<string, object>> = new Map();

        routesMap = Object.entries(compatibilityData).reduce((result, [ontology, entities]) => {
            Object.entries(entities).forEach(([entity, compatibility]) => {
                entity = entity.toLowerCase();

                if (!result.get(entity)) {
                    result.set(entity, {});
                }

                result.set(entity, { ...result.get(entity), [ontology]: compatibility });
            });

            return result;
        }, new Map());

        return routesMap;
    }

    /**
     * @public @static @method getInstance Create the singleton instance if not existing
     * @return {CompatibilityController} Controller singleton constructor
     */
    public static getInstance(): CompatibilityController {
        if (!CompatibilityController._instance) {
            CompatibilityController._instance = new CompatibilityController();
        }
        return CompatibilityController._instance;
    }

    public async compatibilityLayout(route: PublicRoute = {}): Promise<string> {
        const baseData = getTemplateBaseData();

        const index = new PublicTemplate("compatibility"); //tempalte have already a default in the EmailContent.Prepare.

        const title: string = `Compatibilités ontologiques supportées`;

        const entityRoute = `${this._baseRoute}`;

        const metaTitle: string = `${title} &rarr; ${config.appName}`;

        return await index.render({
            context: {
                ...baseData, //basic app and api default string and links
                ...DefaultEmailTheme, //basic theme for colors and sizes.
                title: `${title}`,

                baseRoute: this._baseRoute,

                metaItems: ontologiesMetaData,
                items: compatibilityData,
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

        const entityData = this._routes.get(`/vocabularies/${entity}`); // NOTE: ça marche pas comme ça... quelle est l'intention?

        const title: string = `${entity}`;
        //const title: string = `Vocabulaire controlé de ${config.appName} &rarr; <code>/ref/${entity}</code>`;
        const metaTitle: string = `${entity} &rarr; ${entity} &rarr; Référentiel ${config.appName}`;

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

    public async compatibleEntityLayout(entity: string, route: PublicRoute = {}): Promise<string> {
        const baseData = getTemplateBaseData();

        const index = new PublicTemplate("compatibilitySingle"); //tempalte have already a default in the EmailContent.Prepare.

        // const entityRoute = `${this._baseRoute}/${entity}`;
        const entityData = this._routes.get(entity);

        const entityType = Str.firstCharUpper(entity);

        const title: string = `Compatibilité ontologique d'AVNU - ${entityType}`;
        const metaTitle: string = `${entityType} &rarr; Compatibilité ontologique d'AVNU ${config.appName}`;

        return await index.render({
            context: {
                ...baseData, //basic app and api default string and links
                ...DefaultEmailTheme, //basic theme for colors and sizes.
                title: `${title}`,
                // body: `${body}`,

                baseUrl: config.baseUrl,
                baseRoute: this._baseRoute,
                // entityRoute: entityRoute,

                metaItems: ontologiesMetaData,
                item: entityData,
                entity: entityType,

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

export default CompatibilityController;

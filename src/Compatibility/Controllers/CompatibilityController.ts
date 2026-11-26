import config from "@src/config";

import { getTemplateBaseData } from "@src/Templates/Emails/EmailData";
import PublicTemplate from "@src/Templates/PublicTemplate";
import DefaultEmailTheme from "@src/Templates/Themes/DefaultEmailTheme";

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

    /**
     * Map entity JSON object to its corresponding key (entity name in lowercase)
     * @private @method mapCompatibilityRoutes
     */
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
     * @public @method getEntityRawData Return the raw JSON data for an entity
     */
    public getEntityRawData(entity: string) {
        return this._routes.get(entity);
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

    public async compatibleEntityLayout(entity: string, route: PublicRoute = {}): Promise<string> {
        const baseData = getTemplateBaseData();

        const index = new PublicTemplate("compatibilitySingle"); //tempalte have already a default in the EmailContent.Prepare.

        // const entityRoute = `${this._baseRoute}/${entity}`;
        const entityData = this._routes.get(entity);

        const entityType = Str.firstCharUpper(entity);

        const title: string = `${entityType} - Compatibilité ontologique d'AVNU`;
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

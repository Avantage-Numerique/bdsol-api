import config from "@src/config";
import { getTemplateBaseData } from "@src/Templates/Emails/EmailData";
import PublicTemplate from "@src/Templates/PublicTemplate";
import DefaultEmailTheme from "@src/Templates/Themes/DefaultEmailTheme";
import { refData } from "../Data/data";

class ReferentialController {
    /** @private @static Singleton instance */
    private static _instance: ReferentialController;

    private constructor() {}

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

    public async referentialLayout(): Promise<string> {
        const baseData = getTemplateBaseData();

        const index = new PublicTemplate("referential"); //tempalte have already a default in the EmailContent.Prepare.

        const title: string = `Référentiel de ${config.appName}`;
        let body: string = ``;

        return await index.render({
            context: {
                ...baseData, //basic app and api default string and links
                ...DefaultEmailTheme, //basic theme for colors and sizes.
                title: `${title}`,
                body: `${body}`,

                baseRoute: "/ref",

                items: refData,

                meta: {
                    title: `${title}`,
                    description: `${body}`,
                    author: `${config.appName}`,
                },
            },
        });
    }

    public async referentialSingleEntityLayout(entity: string): Promise<string> {
        const baseData = getTemplateBaseData();

        const index = new PublicTemplate("referentialSingle"); //tempalte have already a default in the EmailContent.Prepare.

        const title: string = `Référentiel de ${config.appName} - ${entity}`;
        let body: string = ``;

        return await index.render({
            context: {
                ...baseData, //basic app and api default string and links
                ...DefaultEmailTheme, //basic theme for colors and sizes.
                title: `${title}`,
                body: `${body}`,

                baseRoute: "/ref",

                item: refData.primary[entity],

                meta: {
                    title: `${title}`,
                    description: `${body}`,
                    author: `${config.appName}`,
                },
            },
        });
    }
}

export default ReferentialController;

import Page, { PageContent } from "@src/Pages/Controllers/Pages/Page";

import PublicTemplate from "@src/Templates/PublicTemplate";
import DefaultEmailTheme from "@src/Templates/Themes/DefaultEmailTheme";

import HomePage from "@src/Pages/Controllers/Pages/HomePage";
import VersionsPage from "@src/Pages/Controllers/Pages/VersionsPage";
import StatisticsPage from "@src/Pages/Controllers/Pages/StatisticsPage";

import ReferentialPage from "@src/Pages/Controllers/Pages/ReferentialPage";
import ReferentialSinglePage from "@src/Pages/Controllers/Pages/ReferentialSinglePage";
import ReferentialPrimitivesPage from "./Pages/ReferentialPrimitivesPage";

import LogHelper from "@src/Monitoring/Helpers/LogHelper";

import { getApiConfig } from "@src/config";
import { getTemplateBaseData } from "@src/Templates/Emails/EmailData";
import { StatusCodes } from "http-status-codes";

class PagesController {
    /** @private @static Singleton instance */
    private static _instance: PagesController;

    public name: string = "PagesController";

    constructor() {}

    /**
     * @public @static @method getInstance Create the singleton instance if not existing
     * @return {MonitoringController} Controller singleton constructor
     */
    public static getInstance(): PagesController {
        if (PagesController._instance === undefined) {
            PagesController._instance = new PagesController();
        }
        return PagesController._instance;
    }

    public async versions(): Promise<string> {
        const versionsPage = new VersionsPage("versions", "versions");

        return await versionsPage.render();
    }

    public async homePage(): Promise<string> {
        /*const updatedConfig = getApiConfig();
        const baseData = getTemplateBaseData();
        const index = new PublicTemplate(); //template have already a default in the EmailContent.Prepare.
        const title: string = `${updatedConfig.appName} (version ${updatedConfig.version})`;
        let body: string = "Dans le controler de page !";
        body +=
            updatedConfig.environnement === "development"
                ? `<p>écoute sur le port: ${updatedConfig.port}<br /></p>`
                : "";

        body += `<p>${baseData.api.description}</p>`;
        body +=
            updatedConfig.environnement === "development"
                ? `<p>Slow Down Middleware est <strong>${updatedConfig.debugSlowConnection ? "activé" : "désactivé"}</strong> et ralenti avec ${updatedConfig.debugSlowDuration}ms</p>`
                : "";
        return await index.render({
            context: {
                ...baseData, //basic app and api default string and links
                ...DefaultEmailTheme, //basic theme for colors and sizes.
                title: `${title}`,
                body: `${body}`,
                meta: {
                    title: `${title}`,
                    description: `${body}`,
                    author: `${updatedConfig.appName}`,
                },
            },
        });*/
        const homePage = new HomePage("homePage");

        return await homePage.render();
    }

    public async statistics(): Promise<string> {
        const versionsPage = new StatisticsPage("statistics");

        return await versionsPage.render();
    }

    public async referential(): Promise<string> {
        const referentialPage = new ReferentialPage("referential");

        return await referentialPage.render();
    }

    public async referentialSingle(): Promise<string> {
        const referentialPageSingle = new ReferentialSinglePage("referentialSingle");

        return await referentialPageSingle.render();
    }

    public async referentialPrimitives(): Promise<string> {
        const referentialPagePrimitives = new ReferentialPrimitivesPage("referentialPrimitives");

        return await referentialPagePrimitives.render();
    }

    public async layout(name = "page", content: PageContent): Promise<string> {
        const genericPage = new Page(name, "page", content);
        return await genericPage.render();
    }
}

export default PagesController;

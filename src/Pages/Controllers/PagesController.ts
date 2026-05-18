import Page, { PageContent } from "@src/Pages/Controllers/Pages/Page";

import PublicTemplate from "@src/Templates/PublicTemplate";
import DefaultEmailTheme from "@src/Templates/Themes/DefaultEmailTheme";

import HomePage from "@src/Pages/Controllers/Pages/HomePage";
import VersionsPage from "@src/Pages/Controllers/Pages/VersionsPage";
import StatisticsPage from "@src/Pages/Controllers/Pages/StatisticsPage";

import ReferentialPage from "@src/Pages/Controllers/Pages/ReferentialPage";
import ReferentialSinglePage from "@src/Pages/Controllers/Pages/ReferentialSinglePage";
import ReferentialPrimitivesPage from "./Pages/ReferentialPrimitivesPage";

import { PublicRoute } from "@src/Pages/Types/PublicRoute";

class PagesController {
    /** @private @static Singleton instance */
    private static _instance: PagesController;

    public name: string = "PagesController";

    private constructor() {}

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

    public async versions(route: PublicRoute = {}): Promise<string> {
        const versionsPage = new VersionsPage("versions", "versions");
        versionsPage.route = route;
        return await versionsPage.render();
    }

    public async homePage(route: PublicRoute = {}): Promise<string> {
        const homePage = new HomePage("homePage");
        homePage.route = route;
        return await homePage.render();
    }

    public async statistics(route: PublicRoute = {}): Promise<string> {
        const versionsPage = new StatisticsPage("statistics");
        versionsPage.route = route;
        return await versionsPage.render();
    }

    public async referential(route: PublicRoute = {}): Promise<string> {
        const referentialPage = new ReferentialPage("referential");
        referentialPage.route = route;
        return await referentialPage.render();
    }

    public async referentialSingle(route: PublicRoute = {}): Promise<string> {
        const referentialPageSingle = new ReferentialSinglePage("referentialSingle");
        referentialPageSingle.route = route;
        return await referentialPageSingle.render();
    }

    public async referentialPrimitives(route: PublicRoute = {}): Promise<string> {
        const referentialPagePrimitives = new ReferentialPrimitivesPage("referentialPrimitives");
        referentialPagePrimitives.route = route;
        return await referentialPagePrimitives.render();
    }

    public async layout(name = "page", content: PageContent): Promise<string> {
        const genericPage = new Page(name, "page", content);
        return await genericPage.render();
    }
}

export default PagesController;

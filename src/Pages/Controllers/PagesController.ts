import Page, {PageContent} from "@src/Pages/Controllers/Pages/Page";
import VersionsPage from "@src/Pages/Controllers/Pages/VersionsPage";
import StatisticsPage from "@src/Pages/Controllers/Pages/StatisticsPage";

class PagesController {

    /** @private @static Singleton instance */
    private static _instance: PagesController;

    public name: string = "PagesController";

    constructor() {

    }

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

    public async versions():Promise<string> {
        const versionsPage = new VersionsPage("versions", "versions");

        return await versionsPage.render();
    }
    public async statistics():Promise<string> {
        const versionsPage = new StatisticsPage("statistics");

        return await versionsPage.render();
    }

    public async layout(name="page", content:PageContent): Promise<string> {

        const genericPage = new Page(name, "page", content);
        return await genericPage.render();
    }


}

export default PagesController;
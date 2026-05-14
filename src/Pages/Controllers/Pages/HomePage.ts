import Page, { PageContent } from "@src/Pages/Controllers/Pages/Page";
import { getApiConfig } from "@src/config";
import { PublicRoute } from "@src/Pages/Types/PublicRoute";

class HomePage extends Page {
    apiConfig;

    constructor(
        name: string,
        layout: string = "",
        content: PageContent = { title: "Page", body: "contenu" },
        route: PublicRoute = {}
    ) {
        super(name, layout || "publicHomePage", content);
        this.apiConfig = getApiConfig();
        this.content.title = this.title();
        this.content.body = this.body();
    }

    public title() {
        return `${this.apiConfig.appName} (version ${this.apiConfig.version})`;
    }
    public body() {
        let body = "<div>";
        if (this.apiConfig.environnement === "development") {
            body += `<p><strong>Développement</strong></p><hr/>`;
            body += `<p>Écoute sur le port: ${this.apiConfig.port}<br /></p>`;
            body += `<p>Slow Down Middleware est <strong>${this.apiConfig.debugSlowConnection ? "activé" : "désactivé"}</strong> et ralenti avec ${this.apiConfig.debugSlowDuration}ms</p>`;
        }
        body += "</div>";
        return body;
    }
}

export default HomePage;

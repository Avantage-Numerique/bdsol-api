import Page, { PageContent } from "@src/Pages/Controllers/Pages/Page";
import { getApiConfig } from "@src/config";

class HomePage extends Page {
    apiConfig;

    constructor(name: string, layout: string = "", content: PageContent = { title: "Page", body: "contenu" }) {
        super(name, layout || "publicHomePage", content);
        this.apiConfig = getApiConfig();
        this.content.title = this.title();
        this.content.body = this.body();
    }

    public title() {
        return `${this.apiConfig.appName} (version ${this.apiConfig.version})`;
    }
    public body() {
        const updatedConfig = getApiConfig();

        let body = "<div>";
        body += "Dans le controler de page !";
        body +=
            updatedConfig.environnement === "development"
                ? `<p>écoute sur le port: ${this.apiConfig.port}<br /></p>`
                : "";

        body += `<p>${this.data.api.description}</p>`;
        body +=
            this.apiConfig.environnement === "development"
                ? `<p>Slow Down Middleware est <strong>${this.apiConfig.debugSlowConnection ? "activé" : "désactivé"}</strong> et ralenti avec ${this.apiConfig.debugSlowDuration}ms</p>`
                : "";

        body += "</div>";
        return body;
    }
}

export default HomePage;

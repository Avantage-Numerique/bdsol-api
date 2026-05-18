import Page, { PageContent } from "@src/Pages/Controllers/Pages/Page";

class StatisticsPage extends Page {
    constructor(name: string, layout: string = "", content: PageContent = { title: "Page", body: "contenu" }) {
        super(name, layout || "page", content);
        this.content.title = this.title();
        this.content.body = this.body();
    }

    public title() {
        return "Statistiques d'AVNU";
    }
    public body() {
        let body = "<div>";

        body += "Projet d'ajout des stats pour avnu directement ici.";
        body += "</div>";
        return "";
    }
}

export default StatisticsPage;

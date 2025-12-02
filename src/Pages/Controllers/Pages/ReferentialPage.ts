import Page, { PageContent } from "@src/Pages/Controllers/Pages/Page";

import { refData } from "@src/Referential/Data/data";

class ReferentialPage extends Page {
    constructor(name: string, layout: string = "", content: PageContent = { title: "Page", body: "contenu" }) {
        super(name, layout, content);
        this.content.title = this.title();
        this.content.body = this.body();
    }

    public title() {
        return "Référentiel";
    }

    public body() {
        return JSON.stringify(refData);
    }
}

export default ReferentialPage;

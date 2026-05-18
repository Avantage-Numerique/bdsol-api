import PublicTemplate from "@src/Templates/PublicTemplate";
import config from "@src/config";
import { getTemplateBaseData } from "@src/Templates/Emails/EmailData";
import DefaultTheme from "@src/Templates/Themes/DefaultTheme";
import { PublicRoute } from "@src/Pages/Types/PublicRoute";

interface PageContent {
    title: string;
    body: string;
}

class Page {
    public name: string = "Page";
    public layout: string = "page";
    public content: PageContent = { title: "Page", body: "contenu" };
    public theme: any;
    public data: any;
    public route: PublicRoute;
    public template: PublicTemplate;
    public renderedTemplate: any;
    private _noCache: boolean = true;

    constructor(
        name: string,
        layout: string = "page",
        content: PageContent = { title: "Page", body: "contenu" },
        route: PublicRoute = {}
    ) {
        this.name = name;
        this.layout = layout;
        this.content = content;
        this.theme = DefaultTheme; //basic theme for colors and sizes.
        this.route = route;
        this.data = getTemplateBaseData(); //basic app and api default string and links
    }

    public async render(): Promise<string> {
        if (this._noCache || !this.template) {
            this.template = new PublicTemplate(this.layout); //template have already a default in the EmailContent.Prepare.
        }
        if (this._noCache || !this.renderedTemplate) {
            this.renderedTemplate = await this.template.render({
                context: {
                    ...this.data,
                    ...this.theme,
                    title: this.content.title,
                    body: this.content.body,
                    route: {
                        ...this.route,
                    },
                    meta: {
                        title: `${this.content.title} - ${config.appName}`,
                        description: `${this.content.body}`,
                        author: `${config.appName}`,
                    },
                },
            });
        }
        return this.renderedTemplate;
    }
}

export default Page;
export { PageContent };

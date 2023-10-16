import * as Nunjucks from "nunjucks";
import {NotificationContent} from "@src/Notifications/Notification";
import config from "@src/config";


class EmailTemplate {

    public system:Nunjucks.Environment;
    public content:NotificationContent;
    public basePath:string;
    public includePath:string;
    public emailsPath:string;
    public name:string;

    constructor(name:string="default") {
        //init
        this.name = name + ".njk";
        this.basePath = `${config.basepath}src/Templates/`;
        this.includePath = `${this.basePath}`;//keept this as the base (before the Emails tempaltes, to be able to navigate more easily.
        this.emailsPath = `${this.basePath}/Emails/`;
        this.system = Nunjucks.configure(this.includePath, {autoescape:true});
    }

    public async render(content:NotificationContent) {
        this.content = content;
        return Nunjucks.render(`${this.emailsPath}Layouts/${this.name}`, {...this.baseTemplateContext, ...this.content.context});
    }

    public async preview(content:NotificationContent):Promise<string> {
        return await this.render(content);
    }

    public get baseTemplateContext() {
        return {
            api: {
                name: "AVNU",
                baseUrl: config.baseUrl,
                mediasUrl: `${config.baseUrl}static/medias/emails/`,
                version: config.version
            },
            app: {
                name: "AVNU",
                baseUrl: config.baseUrl,
                mediasUrl: `${config.baseUrl}static/medias/emails/`,
                version: config.version
            },
            company: {
                label: "Est une initiative du",
                name: "Avantage Numérique et du Petit théâtre du vieux Noranda",
                address: "7e rue Rouyn-Noranda, (QC) J9X 1Z9",
                phone: "1 (819) 797-6436",
            },
            links: {
                unsuscribe: "https://avnu.ca",
                cta: "https://avnu.ca",
                seeAsWeb: "https://avnu.ca"
            },
            lang: {
                ctaLabel: "Confirmer mon compte",
                copyCta: "Ou vous pouvez copier l'url : ",
                unsuscribeLabel: "Se désinscrire",
                seeAsWebLabel: "View as a Web Page"
            },
            ...this.theme
        }
    }

    //idea: Set prebuild theme by name, to pass différent + these default.
    //idea : Add button style like this one is basic, cancel btn, generic,etc.
    public get theme() {
        return {
            theme: {
                bg: "#FBF7F5",
                color: "#1F1F2E",
                titleColor: "#1F1F2E",
                content: {
                    bg: "#FBF7F5",
                    hspacing: "20px",
                    wspacing: "20px",
                    spacing: "20px"
                },
                buttons: {
                    radius: "30px",
                    size: "20px",
                    padding: "20px",
                    bg: "#6EC8CD",
                    color: "#1F1F2E"
                }
            }
        }
    }
}

export default EmailTemplate;
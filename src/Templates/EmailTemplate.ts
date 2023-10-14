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

    constructor(name:string="default.njk") {
        //init
        this.name = name;
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
            app: {
                name: "AVNU",
                version: config.version
            },
            company: {
                label: "Est une initiative de",
                name: "Avantage numérique et le Petit théâtre du vieux Noranda",
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

    public get theme() {
        return {
            theme: {
                bg: "#F7F7F9",
                color: "#222222",
                titleColor: "#555555",
                buttons: {
                    radius: "20px",
                    bg: "#222222",
                    color: "#F7F7F9"
                }
            }
        }
    }
}

export default EmailTemplate;
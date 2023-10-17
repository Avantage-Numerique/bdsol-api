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
        this.name = name + ".njk";
        this.basePath = `${config.basepath}src/Templates/`;//absolute in server path.
        this.includePath = `${this.basePath}`;//kept this as the base (before the Emails templates, to be able to navigate more easily.
        this.emailsPath = `${this.basePath}/Emails/`;
        this.system = Nunjucks.configure(this.includePath, {autoescape:true});
    }

    /**
     * Render the target email from Content
     * and context are prepared in EmailNotification contructor.
     * @param content {object}
     */
    public async render(content:NotificationContent) {
        this.content = content;
        return Nunjucks.render(`${this.emailsPath}Layouts/${this.name}`, this.content.context);
    }

    public async preview(content:NotificationContent):Promise<string> {
        return await this.render(content);
    }

}

export default EmailTemplate;
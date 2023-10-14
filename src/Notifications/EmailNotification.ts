import config from "@src/config";
import {createTransport, Transporter} from 'nodemailer';
import Notification, {NotificationConfig, NotificationContent} from "@src/Notifications/Notification";
import * as Nunjucks from "nunjucks";

/**
 * Send an email as a notification with the default templates
 * Some notes in ./notes.md
 * @param config {NotificationConfig} Configuration to send the email. Lost are already defaulted, but need the recipient.
 * @param content {NotificationContent} all the content things
 * @param content.title {string} the subject
 * @param content.context {object} All the variables to push into the template.
 * @param content.context.title {object} All the variables to push into the template.
 */
class EmailNotification extends Notification {

    private _transporter:Transporter;

    constructor(config:NotificationConfig, content:NotificationContent) {
        super(config, content);
    }

    public async send() {

        const templateSystem = Nunjucks.configure("Templates/Emails", {autoescape:true});
        const renderedTemplate = Nunjucks.render('base.njk', this.content.context);

        await this.transporter.sendMail({
            from: config.notifications.email.from,
            to: this.config.recipient,
            subject: this.content.title,
            html: await this.renderTemplate(),
        });
    }

    public async preview() {
        return this.renderTemplate();
    }

    public async renderTemplate() {
        const templateSystem = Nunjucks.configure(`${config.basepath}src/Templates/Emails/`, {autoescape:true, dev:true});
        console.log("preview", this.content.context, templateSystem);

        return Nunjucks.render(`${config.basepath}src/Templates/Emails/Layouts/default.njk`, {...this.baseTemplateContext, ...this.content.context});
    }

    //assign variables ?
    //build template from html.

    public get transporter() {
        if (this._transporter === undefined) {
            const transportOptions:any = {
                host: config.notifications.email.server, // le nom du service dans le fichier docker compose, ici on va mettre "mailhog"
                port: config.notifications.email.port, // 1025
                secure: false,
                auth: {
                    user: config.notifications.email.user,
                    pass: config.notifications.email.password,
                }
            };

            this._transporter = createTransport(transportOptions);
        }
        return this._transporter;
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

export default EmailNotification;
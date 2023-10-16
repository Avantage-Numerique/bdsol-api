import config from "@src/config";
import {createTransport, Transporter} from 'nodemailer';
import Notification, {NotificationConfig, NotificationContent} from "@src/Notifications/Notification";
import EmailTemplate from "@src/Templates/EmailTemplate";
import EmailContent from "@src/Templates/EmailContent";


/**
 * Send an email as a notification with the default Enailtemplate
 * Some notes in ./notes.md
 * @param config {NotificationConfig} Configuration to send the email. Lost are already defaulted, but need the recipient.
 * @param content {NotificationContent} all the content things
 * @param content.title {string} the subject
 * @param content.context {object} All the variables to push into the template.
 * @param content.context.title {object} All the variables to push into the template.
 */
class EmailNotification extends Notification {

    private _transporter:Transporter;
    private _emailTemplate:EmailTemplate;

    constructor(config:NotificationConfig, content:NotificationContent) {
        super(config, EmailContent.prepare(content));

        if (content.template) {
            this._emailTemplate = new EmailTemplate(content.template);
        } else {
            this._emailTemplate = new EmailTemplate();//default : default.njk.
        }
    }

    public async send() {

        await this.transporter.sendMail({
            from: config.notifications.email.from,
            to: this.config.recipient,
            subject: this.content.title,
            html: await this._emailTemplate.render(this.content),
        });
    }

    public async preview():Promise<string> {
        return await this._emailTemplate.preview(this.content);
    }

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
}

export default EmailNotification;
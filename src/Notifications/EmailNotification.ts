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
    private LogHelpder: any;

    constructor(config:NotificationConfig, content:NotificationContent) {
        super(config, EmailContent.prepare(content));

        this._emailTemplate = new EmailTemplate(content.template);//tempalte have already a default in the EmailContent.Prepare.
    }

    /**
     * Send the notification from the COnfig + content of the email notification.
     */
    public async send() {
        if (typeof this.config.recipient !== "undefined") {
            const sendingEmailOptions: any = {
                from: config.notifications.email.from,
                to: this.config.recipient,
                subject: this.config.subject ?? `Un courriel de la part de ${config.appName}`,
                html: await this._emailTemplate.render(this.content),
            };
            await this.transporter.sendMail(sendingEmailOptions);
            return;
        }
        throw new Error("Email Recipient not valid");
    }

    /**
     * Preview this current notification (used to render for test in browser + mailhog
     * @return {string} the email template rentederd (nunjuck).
     */
    public async preview():Promise<string> {
        return await this._emailTemplate.preview(this.content);
    }

    /**
     * singleton-ish transporter setup.
     * @return {Transporter} from nodemailer with the app setup.
     */
    public get transporter() {
        if (this._transporter === undefined) {
            const transportOptions:any = config.environnement === "production" ? this.getProductionTransporterOptions() : this.getDevelopmentTransporterOptions();
            this._transporter = createTransport(transportOptions);
        }
        return this._transporter;
    }

    public getProductionTransporterOptions() {
        return {
            host: config.notifications.email.server,
            port: config.notifications.email.port,
            secure: true,
            auth: {
                user: config.notifications.email.user,
                pass: config.notifications.email.password,
            }
        }
    }
    public getDevelopmentTransporterOptions() {
        return {
            host: config.notifications.email.server, // le nom du service dans le fichier docker compose, ici on va mettre "mailhog"
            port: config.notifications.email.port, // dev : 1025
            secure: false,
            auth: {
                user: config.notifications.email.user,
                pass: config.notifications.email.password,
            }
        }
    }
}

export default EmailNotification;
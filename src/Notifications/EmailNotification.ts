import config from "@src/config";
import {createTransport, Transporter} from 'nodemailer';
import Notification, {NotificationConfig, NotificationContent} from "@src/Notifications/Notification";


class EmailNotification extends Notification {

    private _transporter:Transporter;

    constructor(config:NotificationConfig, content:NotificationContent) {
        super(config, content);
    }

    public async send() {
        await this.transporter.sendMail({
            from: config.notifications.email.from,
            to: this.config.recipient,
            subject: this.content.title,
            html: this.content.body,
        });
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
}

export default EmailNotification;

const NOTIFICATION_EMAIL:string = "email";

interface NotificationContent {
    title:string,
    body:string,
    bodyType?:string
}
interface NotificationConfig {
    method?:string,
    recipient:string
}

class Notification {

    public default_method:string = NOTIFICATION_EMAIL;
    public method:string;
    public config:any = {};
    public content:NotificationContent;

    constructor(config:NotificationConfig, content:NotificationContent) {
        this.method = config.method ?? this.default_method;
        this.content = content;
        this.config = config;
    }

    public async send() {
        if (this.method === NOTIFICATION_EMAIL) {

        }
    }

}

export {NOTIFICATION_EMAIL, NotificationContent, NotificationConfig};
export default Notification;
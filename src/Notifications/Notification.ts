
const NOTIFICATION_EMAIL:string = "email";

interface NotificationContent {
    context?:any
    template?:string
}
interface NotificationConfig {
    method?:string,
    recipient:string,
    subject:string
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
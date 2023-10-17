
const NOTIFICATION_EMAIL:string = "email";

interface NotificationContent {
    context?:any
    template?:string
}
interface NotificationConfig {
    method?:string,//for now only email is implemented and no factory setup.
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
            //abstract transporter setup.//check if this kind of keyword works for sms and other type of notification.
            //notification setup
            //notification send.
        }
    }

}

export {NOTIFICATION_EMAIL};//types of notification
export {NotificationContent, NotificationConfig};//interfaces.
export default Notification;//class
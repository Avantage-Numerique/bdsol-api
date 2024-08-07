import config from "@src/config";
import {getTemplateBaseData} from "@src/Templates/Emails/EmailData";
import DefaultEmailTheme from "@src/Templates/Themes/DefaultEmailTheme";
import {NotificationContent} from "@src/Notifications/Notification";

/**
 * No theme nor base template vars. Only the ones needed from email content.
 */
interface EmailContentContract {
    welcome?:string,
    title?:string,
    body?:string,
    conclusion?:string,
    signature?:string,
    cta?:EmailLinkContract,
}

interface EmailLinkContract {
    link?:string,
    label?:string
}

class EmailContent {

    public static prepare(content:NotificationContent) {
        return {
            context: EmailContent.prepareContext(content.context),
            template: content.template ?? "default"
        }
    }

    public static prepareContext(context:EmailContentContract={}) {
        return {
            ...EmailContent.baseTemplateContext(),
            welcome: context.welcome ?? `Salut,`,
            title: context.title ?? `Un message de ${config.appName}`,
            body: context.body ?? "",
            conclusion: context.conclusion ?? "",
            signature: context.signature ?? "L'équipe d'avnu",
            cta: {
                link: context.cta?.link ?? `${config.baseUrl}`,
                label: context.cta?.label ?? `${config.appName}`
            }
        }
    }

    public static baseTemplateContext():any {
        const baseData = getTemplateBaseData();
        return {
            cta: {
                cta: "https://avnu.ca",
                label: "Le répertoire des techno-créatif du Croissant boréal"
            },
            links: {
                unsuscribe: "https://avnu.ca",
                seeAsWeb: "https://avnu.ca"
            },
            lang: {
                ctaLabel: "Confirmer mon compte",
                copyCta: "Ou vous pouvez copier l'url : ",
                unsuscribeLabel: "Se désinscrire",
                seeAsWebLabel: "View as a Web Page"
            },
            ...baseData,//basic app and api default string and links
            ...DefaultEmailTheme//basic theme for colors and sizes.
        }
    }

}

export default EmailContent;
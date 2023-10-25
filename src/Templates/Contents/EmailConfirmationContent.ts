import {EmailData} from "@src/Templates/Emails/EmailData";

const EmailConfirmationContent:any = (welcomeName:string, link:string, additionnalContext:any={}) => {
    return {
        context: {
            welcome: `Salut, ${welcomeName}`,//to define from the content.//getter to concatenate ?
            title:"Il faut confirmer votre courriel",
            body: "Il reste seulement cette étape avant que votre compte soit actif sur avnu.ca.<br/><br/>Il faut cliquer sur le lien ci-dessous pour terminer votre inscription.",
            conclusion: `Ensuite vous pourrez participer et ajouter des données sur avnu.<br /><br /><strong>Important</strong> <u>Si vous n’êtes pas à l’origine de cette inscription sur avnu.ca</u>, veuillez ignorer ce courriel, et merci de <a href="mailto:${EmailData.company.email}" title='Contact ${EmailData.company.email}'><u>nous contacter via ${EmailData.company.email}</u></a> pour nous avertir de la situation.`,
            signature: "L'équipe d'avnu",
            cta: {
                link: `${link}`,//to define from the content
                label: "Confirmer votre courriel pour le compte avnu.ca"
            },
            ...additionnalContext//this will be available into the template, but need to be implemented.
        },
        template: "default"
    }
}

export {EmailConfirmationContent};
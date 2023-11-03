import {EmailData} from "@src/Templates/Emails/EmailData";

const EmailContactUsReceivedContent:any = (welcomeName:string, link:string, additionnalContext:any={}) => {
    return {
        context: {
            welcome: `Salut, ${welcomeName}`,//to define from the content.//getter to concatenate ?
            title:"Merci de vos commentaires",
            body: "Nous avons bien reçu votre message.<br/><br/>Notre équipe a été notifié et, au besoin, vous réponderons dès que possible.",
            conclusion: `<strong>Important</strong> <u>Si vous n’êtes pas à l’origine de ce message</u>, veuillez ignorer ce courriel, et merci de <a href="mailto:${EmailData.company.email}" title='Contact ${EmailData.company.email}'><u>nous contacter via ${EmailData.company.email}</u></a> pour nous avertir de la situation.`,
            signature: "L'équipe d'avnu",
            cta: {
                link: `${link}`,//to define from the content
                label: "avnu.ca"
            },
            ...additionnalContext//this will be available into the template, but need to be implemented.
        },
        template: "default"
    }
}

export {EmailContactUsReceivedContent};
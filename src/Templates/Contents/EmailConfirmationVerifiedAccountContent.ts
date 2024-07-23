import {EmailData} from "@src/Templates/Emails/EmailData";

const EmailConfirmationVerifiedAccountContent:any = (welcomeName:string, link:string, additionnalContext:any={}) => {
    return {
        context: {
            welcome: `Salut, ${welcomeName}`,//to define from the content.//getter to concatenate ?
            title:"Votre compte a été vérifié sur avnu.ca",
            body: "Vous pouvez maintenant ajouter ou modifier des données sur avnu.ca avec votre compte.",
            conclusion: `<strong>Important</strong> <u>Si vous n’êtes pas à l’origine de cette verification de compte sur avnu.ca</u>, veuillez ignorer ce courriel, et merci de <a href="mailto:${EmailData.company.email}" title='Contact ${EmailData.company.email}'><u>nous contacter via ${EmailData.company.email}</u></a> pour nous avertir de la situation.<br/><u>Veuillez ne pas répondre à courriel.</u>`,
            signature: "L'équipe d'avnu",
            cta: {
                link: `${link}`,//to define from the content
                label: "Se connecter sur avnu.ca"
            },
            ...additionnalContext//this will be available into the template, but need to be implemented.
        },
        template: "default"
    }
}

export {EmailConfirmationVerifiedAccountContent};
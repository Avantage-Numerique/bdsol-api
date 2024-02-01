
const EmailForgottenPasswordContent:any = (welcomeName:string, link:string, username:string, additionnalContext:any={}) => {
    return {
        context: {
            welcome: `Salut, ${welcomeName}`,//to define from the content.//getter to concatenate ?
            title:"Demande de réinitialisation de mot de passe ou de récupération du nom d'utilisateur",
            body: `Une demande de réinitialisation de mot de passe et d'obtention de nom d'utilisateur a été faite sur avnu.ca pour ce courriel.<br/>Votre nom d'utilisateur est " ${username} "<br/>Cliquez sur le lien ci-dessous pour mettre à jour votre mot de passe.`,
            conclusion: "<br/><br/><strong>Important</strong> <u>Si vous n’êtes pas à l’origine de cette demande sur avnu.ca</u>, veuillez ignorer ce courriel, et merci de nous contacter pour nous avertir de la situation.",
            signature: "L'équipe d'avnu",
            cta: {
                link: `${link}`,//to define from the content
                label: "Réinitialiser mon mot de passe pour le compte avnu.ca"
            },
            ...additionnalContext//this will be available into the template, but need to be implemented.
        },
        template: "default"
    }
}

export {EmailForgottenPasswordContent};
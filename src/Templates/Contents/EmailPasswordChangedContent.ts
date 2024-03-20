
const EmailPasswordChangedContent:any = (welcomeName:string, link:string, additionnalContext:any={}) => {
    return {
        context: {
            welcome: `Salut, ${welcomeName}`,//to define from the content.//getter to concatenate ?
            title:"Votre mot de passe à été modifié",
            body: "Le mot de passe de votre compte avnu.ca associé à ce courriel a été modifié.<br/><br/>",
            conclusion: "<br/><br/><strong>Important</strong> <u>Si vous n’êtes pas à l’origine de cette modification sur avnu.ca</u>, veuillez nous contacter via notre courriel pour nous informer de la situation.<br/><u>Veuillez ne pas répondre à courriel.</u>",
            cta: {
                link: `${link}`,//to define from the content
                label: "Se connecter à avnu.ca"
            },
            signature: "L'équipe d'avnu",
            ...additionnalContext//this will be available into the template, but need to be implemented.
        },
        template: "default"
    }
}


const EmailPasswordChangedTextContent:any = () => {
    return "Le mot de passe de votre compte avnu.ca associé à ce courriel a été modifié. Si vous n’êtes pas à l’origine de cette modification sur avnu.ca, veuillez nous contacter via notre courriel pour nous informer de la situation.";
}

export {EmailPasswordChangedContent, EmailPasswordChangedTextContent};
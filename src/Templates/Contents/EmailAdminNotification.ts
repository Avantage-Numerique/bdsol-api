
const EmailAdminNotification:any = (communicationObject:any, additionnalContext:any={}) => {
    return {
        context: {
            welcome: `Salut,`,//to define from the content.//getter to concatenate ?
            title:`Un nouveau ${communicationObject?.communicationType} a été envoyé`,
            body: `Voici les détails : <br/> 
                communicationType : ${communicationObject?.communicationType ?? "-"}<br/>
                name : ${communicationObject?.name ?? "-"}<br/>
                email : ${communicationObject?.email ?? "-"}<br/>
                message : ${communicationObject?.message ?? "-"}<br/>
                date : ${communicationObject?.date ?? "-"}<br/>
                reportedEntityId : ${communicationObject?.reportedEntityId ?? "-"}<br/>
                reportedEntityType : ${communicationObject?.reportedEntityType ?? "-"}<br/>
                reportedEntitySlug : ${communicationObject?.reportedEntitySlug ?? "-"}<br/>`,
            conclusion: "<br/>Merci de traitez cette demande comme il se doit :)",
            /* cta: {
                link: `${link}`,//to define from the content
                label: "Se connecter à avnu.ca"
            }, */
            signature: "Cordialement, l'équipe de dev d'Avnu <3",
            ...additionnalContext//this will be available into the template, but need to be implemented.
        },
        template: "default"
    }
}

export {EmailAdminNotification};
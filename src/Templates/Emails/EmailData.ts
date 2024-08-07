import config from "@src/config";


export const EmailData = {
    api: {
        name: "AVNU",
        baseUrl: config.baseUrl,
        mediasUrl: `${config.baseUrl}/static/medias/emails/`,
        version: config.version,
        description: "Base de donnée ouverte et liée crée par Avantage Numérique et qui recense les techno-créatifs sur le territoire du Croissant boréal.",
    },
    app: {
        name: "AVNU",
        baseUrl: config.baseUrl,
        mediasUrl: `${config.baseUrl}/static/medias/emails/`,
        version: config.version
    },
    company: {
        label: "Est une initiative du",
        name: "Avantage Numérique et du Petit théâtre du vieux Noranda",
        address: "112, 7e rue Rouyn-Noranda, (QC) J9X 1Z9",
        phone: "1 (819) 797-6436",
        email: "bonjour@avnu.ca",
    }
}

export const getTemplateBaseData = () => {
    return {
        api: {
            name: "AVNU",
            baseUrl: config.baseUrl,
            mediasUrl: `${config.baseUrl}/static/medias/emails/`,
            version: config.version,
            description: "Base de donnée ouverte et liée crée par Avantage Numérique et qui recense les techno-créatifs sur le territoire du Croissant boréal.",
        },
        app: {
            name: "AVNU",
            baseUrl: config.baseUrl,
            mediasUrl: `${config.baseUrl}/static/medias/emails/`,
            version: config.version
        },
        company: {
            label: "Est une initiative du",
            name: "Avantage Numérique et du Petit théâtre du vieux Noranda",
            address: "112, 7e rue Rouyn-Noranda, (QC) J9X 1Z9",
            phone: "1 (819) 797-6436",
            email: "bonjour@avnu.ca",
        }
    }
}
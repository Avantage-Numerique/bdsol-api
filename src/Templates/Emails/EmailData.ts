import config from "@src/config";

export const EmailData = {
    api: {
        name: "AVNU",
        baseUrl: config.baseUrl,
        mediasUrl: `${config.baseUrl}/static/medias/emails/`,
        version: config.version,
        description:
            "Base de données ouverte et liée créée par Avantage Numérique et qui recense les ressources technologiques francophones régionales et locales.",
    },
    app: {
        name: "AVNU",
        baseUrl: config.baseUrl,
        mediasUrl: `${config.baseUrl}/static/medias/emails/`,
        version: config.version,
    },
    company: {
        label: "Est une initiative du",
        name: "Avantage Numérique et du Petit théâtre du vieux Noranda",
        address: "112, 7e rue Rouyn-Noranda, (QC) J9X 1Z9",
        phone: "1 (819) 797-6436",
        email: "bonjour@avnu.ca",
    },
};

/**
 *     <meta name="twitter:title" content="{{ meta.title | safe }}" />
 *     <meta name="twitter:description" content="{{ meta.description }}" />
 *     <meta name="twitter:card" content="summary_large_image" />
 *     <meta name="twitter:image" content={displayedImg} />
 *     <meta property="twitter:image:alt" content={defaultImgAlt} />
 *     <meta property="twitter:image:width" content={defaultImgWidth} />
 *     <meta property="twitter:image:height" content={defaultImgHeight} />
 */
/**
 * Get the template date to push into nunjucks template.
 * Note : defaultThumbnail use the express static delivery and emails uses the API based one.
 * @return {Object}
 */
export const getTemplateBaseData = () => {
    return {
        api: {
            name: "AVNU",
            baseUrl: config.baseUrl,
            mediasUrl: `${config.baseUrl}/static/medias/emails/`,
            version: config.version,
            description:
                "Base de données ouverte et liée créée par Avantage Numérique et qui recense les ressources technologiques francophones régionales et locales.",
        },
        app: {
            name: "AVNU",
            baseUrl: config.baseUrl,
            mediasUrl: `${config.baseUrl}/static/medias/emails/`,
            version: config.version,
        },
        defaultThumbnail: {
            title: "AVNU",
            description:
                "Base de données ouverte et liée créée par Avantage Numérique et qui recense les ressources technologiques francophones régionales et locales.",
            imageUrl: `${config.baseUrl}/images/avnu-thumb.png`,
            imageAlt:
                "Retrouvez en quelques clics les organisations, projets, personnes, équipements et événements en lien avec le numérique sur votre territoire.",
            imageWidth: "1200",
            imageHeight: "630",
        },
        company: {
            label: "Est une initiative du",
            name: "Avantage Numérique et du Petit théâtre du vieux Noranda",
            address: "112, 7e rue Rouyn-Noranda, (QC) J9X 1Z9",
            phone: "1 (819) 797-6436",
            email: "bonjour@avnu.ca",
        },
    };
};

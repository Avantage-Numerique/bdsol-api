type RefItem = { label: string; url: string; similarTo?: Record<string, [string, string]>; ref: Ref[] };

type Ref = { name: string; format: string; description?: string; compatibility?: Record<string, [string, string]> };

type RefData = { primary: Record<string, RefItem>; secondary: Record<string, RefItem> };

export const refData: RefData = {
    primary: {
        person: {
            label: "Personne",
            url: "/person",
            similarTo: {
                schemaorg: ["Person", "https://schema.org/Person"],
                datascene: ["Contributeur", "https://datascene.ca/references/proprietes/contributeur/"],
            },
            ref: [
                {
                    name: "Type",
                    format: "string",
                    compatibility: {
                        //Pas le même vocabulaire https://datascene.ca/references/vocabulaires/types_de_contributeurs/
                        //artsDeLaScene:["Type de contributeur", "https://datascene.ca/references/vocabulaires/types_de_contributeurs/"],
                    },
                    description:
                        "Type de l'entité statique, dans ce cas ci 'Person. Virtuel, statique et non-modifiable.",
                    //fieldName: "type",
                },
                //Pas implémenté dans notre api
                /* {
                    name: "Identifiants",
                    format: "list",//?
                    compatibility: {
                        schemaorg: ["identifier", "https://schema.org/identifier"],
                        datascene: ["Identifiants", "https://datascene.ca/references/proprietes/identifiant/"],
                    },
                }, */
                {
                    name: "Nom",
                    format: "string",
                    compatibility: {
                        schemaorg: ["familyName", "https://schema.org/familyName"],
                    },
                    description: "Nom de famille de la personne.",
                    //fieldName: "lastName",
                },
                {
                    name: "Prénom",
                    format: "string",
                    compatibility: {
                        schemaorg: ["givenName", "https://schema.org/givenName"],
                    },
                    description: "Prénom de la personne.",
                    //fieldName: "firstName",
                },
                {
                    name: "Nom complet",
                    format: "string",
                    compatibility: {
                        datascene: ["Nom", "https://datascene.ca/references/proprietes/contributeur/"],
                    },
                    description:
                        "Prénom et nom. Virtuel et non-modifiable, il s'agit de la simple concaténation du prénom suivi du nom tel qu'inscrit dans les champs 'Nom' et 'Prénom'",
                    //fieldName: "fullName" ou "name",
                },
                {
                    name: "Surnom",
                    format: "string",
                    compatibility: {
                        schemaorg: ["alternateName", "https://schema.org/alternateName"],
                        //Propriété non conforme, il s'agit d'une liste de noms alternatifs.
                        //datascene: ["Nom alternatifs", "https://datascene.ca/references/proprietes/contributeur/"]
                    },
                    description:
                        "Autre appellation parfois utilisé pour designer la personne. Exemple : 'Coeur de pirate' pour 'Béatrice Martin'.",
                    //fieldName: "nickname",
                },
                {
                    name: "Description",
                    format: "string",
                    compatibility: {
                        schemaorg: ["description", "https://schema.org/description"],
                        datascene: ["Description", "https://datascene.ca/references/proprietes/contributeur/"],
                    },
                    description:
                        "Description, à propos, biographie. Il s'agit d'un court texte pour décrire la personne.",
                    //fieldName: "description",
                },
                //Aucune trace de short-description dans notre api.
                /* {
                    name: "short-description",
                    format: "string",
                    compatibility: {
                        datascene: ["Description Courte", "https://datascene.ca/references/proprietes/contributeur/"],
                    },
                }, */
                {
                    name: "Slogan",
                    format: "string",
                    compatibility: {},
                    description: "Courte phrase d'accroche, moto, slogan, citation.",
                    //fieldName: "catchphrase"
                },
                {
                    name: "url",
                    format: "SocialHandle[]",
                    compatibility: {
                        //Propriété non conforme, SocialHandle (object) != sameAs (string)
                        //schemaorg: ["sameAs", "https://schema.org/sameAs"],
                    },
                    description: "Liste de lien vers des réseaux sociaux ou site de la personne.",
                    //fieldName: "url",
                },
                {
                    name: "Région",
                    format: "string",
                    compatibility: {
                        //Propriété non conforme à datascene "associations géographiques".
                        //Similaire à "associations géographiques: ville", mais pas array
                        //datascene: ["Associations géographiques", "https://datascene.ca/references/proprietes/contributeur/"]
                    },
                    description:
                        "Région d'appartenance. Texte parmi la liste : ['', 'abitibi-temiscamingue', 'north Ontario', 'baies-james', 'other']",
                    //fieldName: "region",
                },
                {
                    name: "Moyen de contact",
                    format: "ContactPoint",
                    compatibility: {},
                    description: "Téléphone, courriel et site web principal pour contacter la personne.",
                    //fieldName: "contactPoint",
                },
                {
                    name: "Compétences",
                    format: "SkillGroup[]",
                    compatibility: {},
                    description:
                        "Groupe de compétences, habiletés et/ou de technologies, tirés de notre base de données, utilisés par la personne et accompagné d'un libellé qui décrit le regroupement.",
                    //fieldName: "occupations",
                },
                {
                    name: "Domaine d'activités",
                    //Ajouter un schema secondaire. Bien que non défini dans la BD
                    format: "Taxonomy[] de type 'Domain'",
                    compatibility: {},
                    description: "Liste de domaines correspondants aux compétences et au travail de la personne.",
                    //fieldName: "domains",
                },
                {
                    name: "Média",
                    format: "Media (id)",
                    compatibility: {},
                    description: "Référence à une image stockée sur notre serveur comme image de profil.",
                    //fieldName: "mainImage",
                },
                {
                    name: "Badges",
                    format: "Liste de string",
                    compatibility: {},
                    description:
                        "Liste de badges donnés à une personne. Chaque badge indique une information supplémentaire en lien avec la personne. Non-modifiable.",
                    //fieldName: "badges",
                },
                //Non existant dans l'api et aucune source externe autre que notre ontologie :
                //Projets
                //Organisations
                //Participants à des événements
                //Pronoun

                //Pas dans l'ontologie
                /* {
                    name: "slug",
                    format: "string",
                    compatibility: {},
                    description: "",
                    //fieldName: "slug",
                },
                {
                    name: "meta",
                    format: "Meta",
                    compatibility: {},
                    description: "",
                    //fieldName: "meta",
                }, */
            ],
        },
    },

    secondary: {
        SkillGroup: {
            label: "Groupe de compétence",
            url: "/skillgroup",
            ref: [
                {
                    name: "groupName",
                    format: "string",
                    description: "Libellé utilisé par la personne pour décrire son groupe de compétences",
                },
                {
                    name: "skills",
                    format: "Liste de Taxonomies (id)",
                    description: "Liste de compétences, habiletés ou de technologies.",
                },
                {
                    name: "subMeta",
                    format: "SubMeta",
                },
            ],
        },
    },
};

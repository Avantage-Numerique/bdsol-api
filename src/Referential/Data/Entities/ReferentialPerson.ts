import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { refContactPoint } from "../SubSchema/ReferentialContactPoint";
import { refDomainList } from "../SubSchema/ReferentialDomainList";
import { refSkillGroup } from "../SubSchema/ReferentialSkillGroup";
import { RefItem } from "../types";
import { refSocialHandle } from "../SubSchema/ReferentialSocialHandle";

export const refPerson: RefItem = {
    label: "Personne",
    url: "/person",
    description: "Entité qui désigne une personne, qui décrit ses activités, ces compétences et autres.",
    similarTo: [
        {
            externalSource: {
                name: "Schema.org",
            },
            mapping: {
                externalField: "Person",
                ontologyProperty: "schema:person",
                ontologyUri: "https://schema.org/Person",
            },
            documentationUrl: "https://schema.org/Person",
        },
        {
            externalSource: {
                name: "Datascene",
                //sparqlEndpoint: ""
            },
            mapping: {
                externalField: "Contributeur",
                //ontologyProperty: "",
                //ontologyUri: "",
            },
            documentationUrl: "https://datascene.ca/references/proprietes/contributeur/",
        },
    ],
    ref: [
        {
            field: "type",
            //ontologyProperty: "an:type",
            label: "Type",
            type: "string",
            cardinality: "1..1",
            compatibility: [
                //Pas le même vocabulaire https://datascene.ca/references/vocabulaires/types_de_contributeurs/
                /* {
                            externalSource: {
                                name: "Datascene",
                                //sparqlEndpoint: ""
                            },
                            mapping: {
                                externalField: "Type de contributeur",
                                //ontologyProperty: "",
                                //ontologyUri: "",
                            },
                            documentationUrl: "https://datascene.ca/references/vocabulaires/types_de_contributeurs/",
                        }, */
            ],
            description: "Type de l'entité statique, dans ce cas ci 'Person. Virtuel, statique et non-modifiable.",
        },
        //Pas implémenté dans notre api
        /* {
                    label: "Identifiants",
                    type: "list",//?
                    compatibility: {
                        schemaorg: ["identifier", "https://schema.org/identifier"],
                        datascene: ["Identifiants", "https://datascene.ca/references/proprietes/identifiant/"],
                    },
                }, */
        {
            field: "lastName",
            //ontologyProperty: "an:lastName",
            label: "Nom",
            type: "string",
            cardinality: "1..1",
            compatibility: [
                {
                    externalSource: {
                        name: "Schema.org",
                    },
                    mapping: {
                        externalField: "familyName",
                        ontologyProperty: "schema:familyName",
                        ontologyUri: "https://schema.org/familyName",
                    },
                    documentationUrl: "https://schema.org/familyName",
                },
            ],
            description: "Nom de famille de la personne.",
        },
        {
            field: "firstName",
            //ontologyProperty: "an:firstName",
            label: "Prénom",
            type: "string",
            cardinality: "1..1",
            compatibility: [
                {
                    externalSource: {
                        name: "Schema.org",
                    },
                    mapping: {
                        externalField: "givenName",
                        ontologyProperty: "schema:givenName",
                        ontologyUri: "https://schema.org/givenName",
                    },
                    documentationUrl: "https://schema.org/givenName",
                },
            ],
            description: "Prénom de la personne.",
        },
        {
            field: "fullName", // ou "name",
            label: "Nom complet",
            //ontologyProperty: "an:fullName",
            type: "string",
            cardinality: "1..1",
            compatibility: [
                {
                    externalSource: {
                        name: "Datascene",
                    },
                    mapping: {
                        externalField: "Nom",
                        //ontologyProperty: "",
                        //ontologyUri: "",
                    },
                    documentationUrl: "https://datascene.ca/references/proprietes/contributeur/",
                },
            ],
            description:
                "Prénom et nom. Virtuel et non-modifiable, il s'agit de la simple concaténation du prénom suivi du nom tel qu'inscrit dans les champs 'Nom' et 'Prénom'",
        },
        {
            field: "nickname",
            //ontologyProperty: "an:nickname",
            label: "Surnom",
            type: "string",
            cardinality: "0..1",
            compatibility: [
                {
                    externalSource: {
                        name: "Schema.org",
                    },
                    mapping: {
                        externalField: "alternateName",
                        ontologyProperty: "schema:alternateName",
                        ontologyUri: "https://schema.org/alternateName",
                    },
                    documentationUrl: "https://schema.org/alternateName",
                },
                //Propriété non conforme, il s'agit d'une liste de noms alternatifs.
                /* {
                            externalSource: {
                                name: "Datascene",
                            },
                            mapping: {
                                externalField: "Nom alternatifs",
                                ontologyProperty: "",
                                ontologyUri: "",
                            },
                            documentationUrl: "https://datascene.ca/references/proprietes/contributeur/",
                        }, */
            ],
            description:
                "Autre appellation parfois utilisé pour designer la personne. Exemple : 'Coeur de pirate' pour 'Béatrice Martin'.",
        },
        {
            field: "description",
            //ontologyProperty: "an:description",
            label: "Description",
            type: "string",
            cardinality: "0..1",
            compatibility: [
                {
                    externalSource: {
                        name: "Schema.org",
                    },
                    mapping: {
                        externalField: "description",
                        ontologyProperty: "schema:description",
                        ontologyUri: "https://schema.org/description",
                    },
                    documentationUrl: "https://schema.org/description",
                },
                {
                    externalSource: {
                        name: "Datascene",
                    },
                    mapping: {
                        externalField: "Description",
                        //ontologyProperty: "",
                        //ontologyUri: "",
                    },
                    documentationUrl: "https://datascene.ca/references/proprietes/contributeur/",
                },
            ],
            description: "Description, à propos, biographie. Il s'agit d'un court texte pour décrire la personne.",
        },
        //Aucune trace de short-description dans notre api.
        /* {
                    label: "short-description",
                    type: "string",
                    compatibility: {
                        datascene: ["Description Courte", "https://datascene.ca/references/proprietes/contributeur/"],
                    },
                }, */
        {
            field: "catchphrase",
            //ontologyProperty: "an:catchphrase",
            label: "Slogan",
            type: "string",
            cardinality: "0..1",
            compatibility: [],
            description: "Courte phrase d'accroche, moto, slogan, citation.",
        },
        {
            field: "url",
            //ontologyProperty: "an:socialhandle",
            label: "url",
            type: "object",
            cardinality: "0..N",
            subSchema: {
                label: refSocialHandle.label,
                url: refSocialHandle.url,
            },
            compatibility: [
                //Propriété non conforme, SocialHandle (object) != sameAs (string)
                /* {
                            externalSource: {
                                name: "Schema.org",
                            },
                            mapping: {
                                externalField: "sameAs",
                                ontologyProperty: "schema:sameAs",
                                ontologyUri: "https://schema.org/sameAs",
                            },
                            documentationUrl: "https://schema.org/sameAs",
                        }, */
            ],
            description: "Liste de lien vers des réseaux sociaux ou site de la personne.",
        },
        {
            field: "region",
            //ontologyProperty: "an:region",
            label: "Région",
            type: "string",
            cardinality: "0..1",
            compatibility: [
                //Propriété non conforme à datascene "associations géographiques".
                //Similaire à "associations géographiques: ville", mais pas array
                /* {
                            externalSource: {
                                name: "Datascene",
                            },
                            mapping: {
                                externalField: "Associations géographiques",
                                //ontologyProperty: "",
                                //ontologyUri: "",
                            },
                            documentationUrl: "https://datascene.ca/references/proprietes/contributeur/",
                        }, */
            ],
            description:
                "Région d'appartenance. Texte parmi la liste : ['', 'abitibi-temiscamingue', 'north Ontario', 'baies-james', 'other']",
        },
        {
            field: "contactPoint",
            //ontologyProperty: "an:contactPoint",
            label: refContactPoint.label,
            type: "object",
            cardinality: "0..1",
            subSchema: {
                label: refContactPoint.label,
                url: refContactPoint.url,
            },
            compatibility: [],
            description: "Téléphone, courriel et site web principal pour contacter la personne.",
        },
        {
            field: "occupations",
            //ontologyProperty: "an:occupations",
            label: "Compétences",
            type: "object",
            cardinality: "0..N",
            subSchema: {
                label: refSkillGroup.label,
                url: refSkillGroup.url,
            },
            compatibility: [],
            description:
                "Groupe de compétences, habiletés et/ou de technologies, tirés de notre base de données, utilisés par la personne et accompagné d'un libellé qui décrit le regroupement.",
        },
        {
            field: "domains",
            //ontologyProperty: "an:domains",
            label: "Domaine d'activités",
            //Ajouter un schema secondaire. Bien que non défini dans la BD
            type: "object",
            cardinality: "0..N",
            subSchema: {
                label: refDomainList.label,
                url: refDomainList.url,
            },
            compatibility: [],
            description: "Liste de domaines correspondants aux compétences et au travail de la personne.",
        },
        {
            field: "mainImage",
            //ontologyProperty: "an:mainImage",
            label: "Média",
            type: "id",
            entityRef: [EntityTypesEnum.media],
            cardinality: "0..1",
            compatibility: [],
            description: "Référence à une image stockée sur notre serveur comme image de profil.",
        },
        {
            field: "badges",
            //ontologyProperty: "an:badges",
            label: "Badges",
            type: "string",
            cardinality: "0..N",
            compatibility: [],
            description:
                "Liste de badges donnés à une personne. Chaque badge indique une information supplémentaire en lien avec la personne. Non-modifiable.",
        },
        //Non existant dans l'api et aucune source externe autre que notre ontologie :
        //Projets
        //Organisations
        //Participants à des événements
        //Pronoun

        //Pas dans l'ontologie
        /* {
                    field: "slug",
                    label: "slug",
                    type: "string",
                    compatibility: {},
                    description: "",
                },
                {
                    field: "meta",
                    label: "meta",
                    type: "Meta",
                    compatibility: {},
                    description: "",
                }, */
    ],
};

import { EntityTypesEnum } from "@src/Entities/EntityTypes";

import { refContactPoint } from "@ref/Data/SubSchema/ReferentialContactPoint";
import { refDomainList } from "@ref/Data/SubSchema/ReferentialDomainList";
import { refSkillGroup } from "@ref/Data/SubSchema/ReferentialSkillGroup";
import { refSocialHandle } from "@ref/Data/SubSchema/ReferentialSocialHandle";

import { RefEntityOrSchema } from "@ref/Data/types";
import { refType } from "../Properties/ReferentialType";
import { refDescription } from "../Properties/ReferentialDescription";
import { refCatchphrase } from "../Properties/ReferentialCatchphrase";
import { refRegion } from "../Properties/ReferentialRegion";
import { refBadges } from "../Properties/ReferentialBadges";

export const refPerson: RefEntityOrSchema = {
    label: "Personne",
    url: "/person",
    description: "Entité qui désigne une personne, qui décrit ses activités, ces compétences et autres.",
    compatibility: [
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
        //type
        { ...refType },
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
        { ...refDescription },
        //Aucune trace de short-description dans notre api.
        /* {
                    label: "short-description",
                    type: "string",
                    compatibility: {
                        datascene: ["Description Courte", "https://datascene.ca/references/proprietes/contributeur/"],
                    },
                }, */
        { ...refCatchphrase },
        {
            ...refSocialHandle,
            field: "url",
        },
        { ...refRegion },
        { ...refContactPoint },
        {
            ...refSkillGroup,
            field: "occupations",
        },
        { ...refDomainList },
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
        { ...refBadges },
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

import { RefEntityOrSchema } from "@ref/Data/types";
import { refContactPoint } from "@src/Referential/Data/SubSchema/RefContactPoint";
import { refDomainList } from "@src/Referential/Data/SubSchema/RefDomainList";
import { refSkillGroup } from "@src/Referential/Data/SubSchema/RefSkillGroup";
import { refSocialHandle } from "@src/Referential/Data/SubSchema/RefSocialHandle";
import { refType } from "../Properties/RefType";
import { refDescription } from "../Properties/RefDescription";
import { refCatchphrase } from "../Properties/RefCatchphrase";
import { refRegion } from "../Properties/RefRegion";
import { refBadges } from "../Properties/RefBadges";
import { refMainImageLink } from "../RelationLinks/RefMainImageLink";
import compatibilitySchemaOrg from "@ref/Data/Compatibility/SchemaOrg";
import compatibilityDataScene from "@ref/Data/Compatibility/DataScene";

export const refPerson: RefEntityOrSchema = {
    ontologyProperty: "avnu:person",
    label: "Personne",
    url: "/person",
    description: "Entité qui désigne une personne, qui décrit ses activités, ces compétences et autres.",
    compatibility: [
        compatibilitySchemaOrg.getOntologyCompatibilityArray("person", "Person"),
        compatibilityDataScene.getOntologyCompatibilityArray("person", "Contributor"),
    ],
    ref: [
        { ...refType },
        {
            field: "lastName",
            //ontologyProperty: "an:lastName",
            label: "Nom",
            type: "string",
            cardinality: "1..1",
            compatibility: [compatibilitySchemaOrg.getOntologyCompatibilityArray("familyName")],
            description: "Nom de famille de la personne.",
        },
        {
            field: "firstName",
            //ontologyProperty: "an:firstName",
            label: "Prénom",
            type: "string",
            cardinality: "1..1",
            compatibility: [compatibilitySchemaOrg.getOntologyCompatibilityArray("givenName")],
            description: "Prénom de la personne.",
        },
        {
            field: "fullName", // ou "name",
            label: "Nom complet",
            //ontologyProperty: "an:fullName",
            type: "string",
            cardinality: "1..1",
            compatibility: [
                compatibilityDataScene.getOntologyCompatibilityArray(
                    "name",
                    "Nom",
                    "https://documentation.datascene.ca/references/contributor/#4-propriete-contributeur-contributor-name-nom"
                ),
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
            compatibility: [compatibilitySchemaOrg.getOntologyCompatibilityArray("alternateName")],
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
        { ...refMainImageLink },
        { ...refBadges },
        //Ontologie :
        //Identifiants
        //Projets
        //Organisations
        //Participants à des événements
        //Pronoun

        //Hors-ontologie :
        //slug
        //meta
    ],
};

import { RefProperty } from "@ref/Data/types";
import { refContactPoint } from "@src/Referential/Data/SubSchema/RefContactPoint";
import { refDomainList } from "@src/Referential/Data/SubSchema/RefDomainList";
import { refSkillGroup } from "@src/Referential/Data/SubSchema/RefSkillGroup";
import { refSocialHandle } from "@src/Referential/Data/SubSchema/RefSocialHandle";
//import { refType } from "../Properties/RefType";
import { refDescription } from "../Properties/RefDescription";
import { refCatchphrase } from "../Properties/RefCatchphrase";
import { refRegion } from "../Properties/RefRegion";
import { refBadges } from "../Properties/RefBadges";
import { refMainImageLink } from "../RelationLinks/RefMainImageLink";
import compatibilitySchemaOrg from "@ref/Data/Compatibility/SchemaOrg";
import compatibilityDataScene from "@ref/Data/Compatibility/DataScene";
import compatibilityAvnu from "@ref/Data/Compatibility/Avnu";
import compatibilityArtsdata from "@ref/Data/Compatibility/Artsdata";
import { createPrimitiveUrl, createRefType } from "../utils";
import { refType } from "../Properties/RefType";

export const refPerson: RefProperty = {
    ontologyProperty: "avnu:person",
    label: "Personne",
    url: "/person",
    description: "Entité qui désigne une personne, qui décrit ses activités, ces compétences et autres.",
    compatibility: [
        compatibilityAvnu.getOntologyCompatibilityArray("Person"),
        compatibilityArtsdata.getOntologyCompatibilityArray(
            "Person",
            "Person",
            "https://docs.artsdata.ca/classes/person.html"
        ),
        compatibilitySchemaOrg.getOntologyCompatibilityArray("Person"),
        compatibilityDataScene.getOntologyCompatibilityArray(
            "contributor",
            "Contributor",
            "https://documentation.datascene.ca/references/contributor/#1-propriete-contributeur-contributor-type"
        ),
    ],

    type: createRefType("object"),
    ref: [
        { ...refType },
        {
            field: "identifiers",
            ontologyProperty: "avnu:identifiers",
            label: "Identifiants",
            type: createRefType("string"),
            url: createPrimitiveUrl("identifiers"),
            cardinality: "0..N",
            compatibility: [
                compatibilitySchemaOrg.getOntologyCompatibilityArray("identifier"),
                compatibilityArtsdata.getOntologyCompatibilityArray("identifier"),
            ],
            description: "Identifiants de la personne",
            note: "À implémenter",
        },
        {
            field: "lastName",
            ontologyProperty: "avnu:lastName",
            label: "Nom",
            type: createRefType("string"),
            url: createPrimitiveUrl("lastName"),
            cardinality: "1..1",
            compatibility: [compatibilitySchemaOrg.getOntologyCompatibilityArray("familyName")],
            description: "Nom de famille de la personne.",
        },
        {
            field: "firstName",
            ontologyProperty: "avnu:firstName",
            label: "Prénom",
            type: createRefType("string"),
            url: createPrimitiveUrl("firstName"),
            cardinality: "1..1",
            compatibility: [compatibilitySchemaOrg.getOntologyCompatibilityArray("givenName")],
            description: "Prénom de la personne.",
        },
        {
            field: "fullName", // ou "name",
            label: "Nom complet",
            ontologyProperty: "avnu:fullName",
            type: createRefType("string"),
            url: createPrimitiveUrl("fullName"),
            cardinality: "1..1",
            compatibility: [
                compatibilityDataScene.getOntologyCompatibilityArray(
                    "name",
                    "Nom",
                    "https://documentation.datascene.ca/references/contributor/#4-propriete-contributeur-contributor-name-nom"
                ),
                compatibilityAvnu.getOntologyCompatibilityArray("fullname"),
                compatibilityArtsdata.getOntologyCompatibilityArray("name"),
            ],
            description:
                "Prénom et nom. Virtuel et non-modifiable, il s'agit de la simple concaténation du prénom suivi du nom tel qu'inscrit dans les champs 'Nom' et 'Prénom'",
        },
        {
            field: "nickname",
            ontologyProperty: "avnu:nickname",
            label: "Surnom",
            type: createRefType("string"),
            url: createPrimitiveUrl("nickname"),
            cardinality: "0..1",
            compatibility: [
                compatibilitySchemaOrg.getOntologyCompatibilityArray("alternateName"),
                compatibilityArtsdata.getOntologyCompatibilityArray("alternateName"),
            ],
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

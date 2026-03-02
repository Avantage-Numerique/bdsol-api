import { RefProperty } from "@ref/Data/types";

import { refContactPoint } from "@src/Referential/Data/SubSchema/RefContactPoint";
import { refDomainList } from "@src/Referential/Data/SubSchema/RefDomainList";
import { refSkillGroup } from "@src/Referential/Data/SubSchema/RefSkillGroup";
import { refSocialHandle } from "@src/Referential/Data/SubSchema/RefSocialHandle";

import { refMainImageLink } from "@ref/Data/RelationLinks/RefMainImageLink";

import { refDescription } from "@ref/Data/Properties/RefDescription";
import { refCatchphrase } from "@ref/Data/Properties/RefCatchphrase";
import { refRegion } from "@ref/Data/Properties/RefRegion";
import { refBadges } from "@ref/Data/Properties/RefBadges";
import { refType } from "@ref/Data/Properties/RefType";

import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";
import DataSceneCompatibility from "@ref/Data/Compatibility/DataScene";
import AvnuCompatibility from "@ref/Data/Compatibility/Avnu";
import ArtsdataCompatibility from "@ref/Data/Compatibility/Artsdata";

import { createPrimitiveUrl, createRefType } from "@ref/Data/utils";

export const refPerson: RefProperty = {
    ontologyProperty: "avnu:person",
    label: "Personne",
    url: "/person",
    description: "Entité qui désigne une personne, qui décrit ses activités, ces compétences et autres.",
    compatibility: [
        ArtsdataCompatibility.getOntologyCompatibilityArray(
            "Person",
            "Person",
            "https://docs.artsdata.ca/classes/person.html"
        ),
        SchemaOrgCompatibility.getOntologyCompatibilityArray("Person"),
        DataSceneCompatibility.getOntologyCompatibilityArray(
            "contributor",
            "Contributor (type:Person)",
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
                SchemaOrgCompatibility.getOntologyCompatibilityArray("identifier"),
                ArtsdataCompatibility.getOntologyCompatibilityArray("identifier"),
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
            compatibility: [SchemaOrgCompatibility.getOntologyCompatibilityArray("familyName")],
            description: "Nom de famille de la personne.",
        },
        {
            field: "firstName",
            ontologyProperty: "avnu:firstName",
            label: "Prénom",
            type: createRefType("string"),
            url: createPrimitiveUrl("firstName"),
            cardinality: "1..1",
            compatibility: [SchemaOrgCompatibility.getOntologyCompatibilityArray("givenName")],
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
                DataSceneCompatibility.getOntologyCompatibilityArray(
                    "name",
                    "Nom",
                    "https://documentation.datascene.ca/references/contributor/#4-propriete-contributeur-contributor-name-nom"
                ),
                ArtsdataCompatibility.getOntologyCompatibilityArray("name"),
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
                SchemaOrgCompatibility.getOntologyCompatibilityArray("alternateName"),
                ArtsdataCompatibility.getOntologyCompatibilityArray("alternateName"),
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
        { ...refCatchphrase, compatibility: [SchemaOrgCompatibility.getOntologyCompatibilityArray("additionalName")] },
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

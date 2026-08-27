import { RefSchema } from "@ref/Data/types";

import { refContactPoint } from "@src/Referential/Data/SubSchema/RefContactPoint";
import { refDomainList } from "@src/Referential/Data/SubSchema/RefDomainList";
import { refSkillGroup } from "@src/Referential/Data/SubSchema/RefSkillGroup";
import { refSocialHandle } from "@src/Referential/Data/SubSchema/RefSocialHandle";

import { createRefType } from "@ref/Data/utils";
import { refDescription } from "../Properties/RefDescription";
import { refShortDescription } from "../Properties/RefShortDescription";
import { refType } from "../Properties/RefType";
import { refMainImageLink } from "../RelationLinks/RefMainImageLink";
import { refMeta } from "../SubSchema/RefMeta";
import { refRegion } from "../Properties/RefRegion";
import { refBadges } from "../Properties/RefBadges";

import { refSameAs } from "../Properties/RefSameAs";

export const refPerson: RefSchema = {
    type: createRefType("object"),
    fields: {
        type: refType,
        lastName: {
            cardinality: "1..1",
            type: createRefType("string"),
            constraints: { required: true, minLength: 2 },
        },
        firstName: {
            cardinality: "1..1",
            type: createRefType("string"),
            constraints: { required: true, minLength: 2 },
        },
        nickname: {
            cardinality: "0..1",
            type: createRefType("string"),
        },
        description: refDescription,
        shortDescription: refShortDescription,
        occupations: {
            cardinality: "0..N",
            type: createRefType("object"),
            fields: refSkillGroup.fields,
        },
        domains: {
            cardinality: "0..N",
            type: createRefType("object"),
            fields: refDomainList.fields,
        },
        mainImage: refMainImageLink,
        catchphrase: {
            cardinality: "0..1",
            type: createRefType("string"),
        },
        contactPoint: {
            cardinality: "0..1",
            type: createRefType("object"),
            fields: refContactPoint.fields,
        },
        url: {
            cardinality: "0..N",
            type: createRefType("object"),
            fields: refSocialHandle.fields,
        },
        region: refRegion,
        badges: refBadges,
        meta: {
            cardinality: "0..1",
            type: createRefType("object"),
            fields: refMeta.fields,
        },

        //Ontologie :
        //Identifiants
        //Projets

        //Participants à des événements
        //Pronoun

        //Hors-ontologie :
        //slug
        //meta
        /*
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
        {
            ...refShortDescription,
            compatibility: [
                ArtsdataCompatibility.getOntologyCompatibilityArray(
                    "disambiguatingDescription",
                    "disambiguatingDescription",
                    "https://schema.org/disambiguatingDescription"
                ),
                SchemaOrgCompatibility.getOntologyCompatibilityArray("disambiguatingDescription"),
                DataSceneCompatibility.getOntologyCompatibilityArray(
                    "shortDescription",
                    "shortDescription",
                    "https://documentation.datascene.ca/references/show/#7-propriete-spectacle-show-shortdescription-description-courte"
                ),
            ],
        },
        { ...refCatchphrase, compatibility: [SchemaOrgCompatibility.getOntologyCompatibilityArray("additionalName")] },
        {
            ...refSocialHandle,
            field: "url",
        },
        { ...refRegion },
        { ...refBadges },
        { ...refContactPoint },
        {
            ...refSkillGroup,
            field: "occupations",
        },
        { ...refDomainList },
        { ...refMainImageLink },
        { ...refBadges },

        { ...refSameAs },

        //Ontologie :
        //Identifiants
        //Projets
        { ...refMemberOf },
        //Participants à des événements
        //Pronoun

        { ...refMemberOf },
        */
    },
};

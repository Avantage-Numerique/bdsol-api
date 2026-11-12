import { RefProperty } from "@ref/Data/types";
import { refDescription } from "@ref/Data/Properties/RefDescription";
import { refName } from "@ref/Data/Properties/RefName";
import { refType } from "@ref/Data/Properties/RefType";
import { refContactPoint } from "@ref/Data/SubSchema/RefContactPoint";
import { refSocialHandle } from "@ref/Data/SubSchema/RefSocialHandle";
import { refTeam } from "@ref/Data/SubSchema/RefTeam";
import { refDomainList } from "@ref/Data/SubSchema/RefDomainList";
import { refOrganisationLink } from "@ref/Data/RelationLinks/RefOrganisationLink";
import { refSponsor } from "@ref/Data/SubSchema/RefSponsor";
import { refScheduleBudget } from "@ref/Data/SubSchema/RefScheduleBudget";
import { refPlaceLink } from "@ref/Data/RelationLinks/RefPlaceLink";
import { refMainImageLink } from "@ref/Data/RelationLinks/RefMainImageLink";
import { refEquipmentLink } from "@ref/Data/RelationLinks/RefEquipmentLink";
import { refTaxonomyLink } from "@ref/Data/RelationLinks/RefTaxonomyLink";
import { refAlternateName } from "@ref/Data/Properties/RefAlternateName";
import { createPrimitiveUrl, createRefType } from "@ref/Data/utils";
import { ProjectContextEnum } from "@src/Projects/ProjectContextEnum";
import { refShortDescription } from "@ref/Data/Properties/RefShortDescription";
import AvnuCompatibility from "@ref/Data/Compatibility/Avnu";
import ArtsdataCompatibility from "@ref/Data/Compatibility/Artsdata";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";
import DataSceneCompatibility from "@ref/Data/Compatibility/DataScene";

export const refProject: RefProperty = {
    ontologyProperty: "avnu:Project",
    ontologyType: "Project",
    url: "/project",
    label: "Projet",
    description:
        "Classe Projet qui décrit des projets fait par des organisations, les équipements utilisés, le budget et les étapes nécessaires pour accomplir le projet.",
    compatibility: [
        ArtsdataCompatibility.getOntologyCompatibilityArray(
            "CreativeWork",
            "CreativeWork",
            "https://schema.org/CreativeWork"
        ),
        SchemaOrgCompatibility.getOntologyCompatibilityArray("CreativeWork"),
        DataSceneCompatibility.getOntologyCompatibilityArray("show", "Show"),
    ],
    //note:"",

    type: createRefType("object"),
    ref: [
        { ...refType },
        { ...refName },
        {
            ...refAlternateName,
            description: "Autre nom sous lequel le projet est également connu.",
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
        {
            ...refOrganisationLink,
            field: "entityInCharge", //https://schema.org/author //https://schema.org/maintainer //https://schema.org/producer //https://schema.org/owner
            label: "Entité en charge / Créateur·rice",
            //https://schema.org/owner
            compatibility: [
                ArtsdataCompatibility.getOntologyCompatibilityArray("creator", "Creator", "https://schema.org/creator"),
                SchemaOrgCompatibility.getOntologyCompatibilityArray("Creator"),
            ],
        },
        {
            ...refOrganisationLink,
            field: "producer",
            label: "Producteur·rice",
            compatibility: [
                ArtsdataCompatibility.getOntologyCompatibilityArray(
                    "producer",
                    "producer",
                    "https://schema.org/producer"
                ),
                SchemaOrgCompatibility.getOntologyCompatibilityArray("producer"),
            ],
        },
        { ...refSocialHandle },
        { ...refContactPoint },
        { ...refPlaceLink },
        { ...refTeam },
        { ...refMainImageLink },
        { ...refSponsor },
        { ...refScheduleBudget },
        {
            ...refTaxonomyLink,
            field: "skills",
            label: "Compétences ou technologies",
            cardinality: "0..N",
            description: "Référence à une ou plusieurs taxonomies de type 'skills' ou 'technologies'.",
            //note: "Restreint à un type particulier?"
        },
        { ...refDomainList },
        {
            field: "context",
            ontologyProperty: "avnu:context",
            url: createPrimitiveUrl("context"),
            type: createRefType("string"),
            label: "Contexte du projet",
            cardinality: "0..1",
            description: "Contexte du projet. Enum 'academic', 'hobby', 'professional'.",
            compatibility: [AvnuCompatibility.compatibilityMessage()],
            constraints: {
                enum: ProjectContextEnum,
            },
            //note: "",
        },
        { ...refEquipmentLink },

        //Ontologie :
        //Identifiant
        //Short-description
        //Média => pas une liste d'image
        //Événement
        //Langues
        //Sans parole

        //Hors ontologie
        //slug
        //meta
    ],
};

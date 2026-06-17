import { refCatchphrase } from "@ref/Data/Properties/RefCatchphrase";
import { refDescription } from "@ref/Data/Properties/RefDescription";
import { refType } from "@ref/Data/Properties/RefType";
import { refContactPoint } from "@ref/Data/SubSchema/RefContactPoint";
import { refDomainList } from "@ref/Data/SubSchema/RefDomainList";
import { refSkillGroup } from "@ref/Data/SubSchema/RefSkillGroup";
import { refSocialHandle } from "@ref/Data/SubSchema/RefSocialHandle";
import { refTeam } from "@ref/Data/SubSchema/RefTeam";
import { RefProperty } from "@ref/Data/types";
import { refName } from "@ref/Data/Properties/RefName";
import { refEquipmentLinkSchema } from "@ref/Data/SubSchema/RefEquipmentLinkSchema";
import { refRegion } from "@ref/Data/Properties/RefRegion";
import { refBadges } from "@ref/Data/Properties/RefBadges";
import { refMainImageLink } from "@ref/Data/RelationLinks/RefMainImageLink";
import { refPlaceLink } from "@ref/Data/RelationLinks/RefPlaceLink";
import { createPrimitiveUrl, createRefType } from "@ref/Data/utils";
import { refShortDescription } from "@ref/Data/Properties/RefShortDescription";
import AvnuCompatibility from "@ref/Data/Compatibility/Avnu";
import ArtsdataCompatibility from "@ref/Data/Compatibility/Artsdata";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";
import DataSceneCompatibility from "@ref/Data/Compatibility/DataScene";
import { refSameAs } from "../Properties/RefSameAs";

export const refOrganisation: RefProperty = {
    ontologyProperty: "avnu:Organisation",
    url: "/organisation",
    label: "Organisation",
    description: "",
    compatibility: [
        ArtsdataCompatibility.getOntologyCompatibilityArray(
            "Organization",
            "Organization",
            "https://docs.artsdata.ca/classes/organization.html"
        ),
        SchemaOrgCompatibility.getOntologyCompatibilityArray("Organization"),
        DataSceneCompatibility.getOntologyCompatibilityArray(
            "contributor",
            "Contributor (type:Organization)",
            "https://documentation.datascene.ca/references/contributor/#1-propriete-contributeur-contributor-type"
        ),
    ],
    note: "",

    type: createRefType("object"),
    ref: [
        { ...refType },
        { ...refName },
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
            field: "fondationDate",
            type: createRefType("date"),
            ontologyProperty: "avnu:fondationDate",
            url: createPrimitiveUrl("fondationDate"),
            label: "Date de fondation",
            cardinality: "0..1",
            description: "Date où l'entité a été fondé.",
            compatibility: [SchemaOrgCompatibility.getOntologyCompatibilityArray("foundingDate")],
            //note: "",
        },
        { ...refCatchphrase },
        {
            ...refSocialHandle,
        },
        { ...refContactPoint },
        {
            ...refSkillGroup,
            field: "offers",
        },
        { ...refPlaceLink },
        { ...refDomainList },
        { ...refTeam },

        { ...refMainImageLink },
        { ...refEquipmentLinkSchema, compatibility: [AvnuCompatibility.compatibilityMessage()] },
        { ...refRegion },
        { ...refBadges },

        { ...refSameAs },

        //Ontologie :
        //Projets
        //Identifiants
        //Participant à des événement list[]
        //Alternate name
        //short-description

        //Hors-ontologie :
        //meta
        //slug
    ],
};

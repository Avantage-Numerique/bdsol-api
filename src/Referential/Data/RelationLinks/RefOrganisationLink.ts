import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefProperty } from "@ref/Data/types";
import { createRefType } from "@ref/Data/utils";
import ArtsdataCompatibility from "@ref/Data/Compatibility/Artsdata";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";
import DataSceneCompatibility from "@ref/Data/Compatibility/DataScene";

export const refOrganisationLink: RefProperty = {
    //field: "entityInCharge",
    //field: "producer",
    ontologyProperty: "avnu:organisations",
    url: "/organisations",
    label: "Organisations associées",
    type: createRefType("reference", [EntityTypesEnum.organisation]),
    cardinality: "0..N",
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
    description: "Référence à une entité Place, qui décrit un lieu.",
};

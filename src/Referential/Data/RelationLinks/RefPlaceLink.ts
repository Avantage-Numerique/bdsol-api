import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefProperty } from "../types";
import { createRefType } from "../utils";
import ArtsdataCompatibility from "@ref/Data/Compatibility/Artsdata";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";

export const refPlaceLink: RefProperty = {
    field: "location",
    ontologyProperty: "avnu:location",
    url: "/location",
    label: "Référence à un lieu",
    type: createRefType("reference", [EntityTypesEnum.place]),
    cardinality: "0..N",
    compatibility: [
        ArtsdataCompatibility.getOntologyCompatibilityArray("location", "location", "https://schema.org/location"),
        SchemaOrgCompatibility.getOntologyCompatibilityArray("location"),
    ],
    description: "Référence à une entité Place, qui décrit un lieu.",
};

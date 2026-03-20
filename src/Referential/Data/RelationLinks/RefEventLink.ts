import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefProperty } from "../types";
import { createRefType } from "../utils";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";
import ArtsdataCompatibility from "@ref/Data/Compatibility/Artsdata";
import DataSceneCompatibility from "@ref/Data/Compatibility/DataScene";

export const refEventLink: RefProperty = {
    //field: "location",
    ontologyProperty: "avnu:subEvents",
    url: "/subEvents",
    label: "Référence à un sous-événement",
    type: createRefType("reference", [EntityTypesEnum.event]),
    cardinality: "0..N",
    compatibility: [
        SchemaOrgCompatibility.getOntologyCompatibilityArray("subEvent"),
        ArtsdataCompatibility.getOntologyCompatibilityArray("subEvent", "subEvent", "https://schema.org/subEvent"),
    ],
    description: "Référence à des sous-événements.",
};

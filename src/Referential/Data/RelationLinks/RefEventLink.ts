import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefProperty } from "@ref/Data/types";
import { createRefType } from "@ref/Data/utils";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";
import ArtsdataCompatibility from "@ref/Data/Compatibility/Artsdata";

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

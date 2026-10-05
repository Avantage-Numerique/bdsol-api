import { RefProperty } from "@ref/Data/types";
import { createPrimitiveUrl, createRefType } from "@ref/Data/utils";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";

export const refOrder: RefProperty = {
    field: "order",
    type: createRefType("number"),
    ontologyProperty: "avnu:order",
    url: createPrimitiveUrl("order"),
    label: "Ordre",
    cardinality: "0..1",
    compatibility: [SchemaOrgCompatibility.getOntologyCompatibilityArray("position")],
    description: "Ordre des éléments pour le visuel",
}; //https://schema.org/position

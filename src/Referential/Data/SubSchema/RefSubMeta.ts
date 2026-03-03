import { RefProperty } from "../types";
import { createPrimitiveUrl, createRefType } from "../utils";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";

export const refSubMeta: RefProperty = {
    field: "subMeta",
    ontologyProperty: "avnu:submeta",
    label: "Sous-méta",
    cardinality: "0..1",
    url: "/submeta",
    description: "Objet de méta qui conserve des informations pour les sous-schéma.",

    type: createRefType("object"),
    ref: [
        {
            field: "order",
            type: createRefType("number"),
            ontologyProperty: "avnu:order",
            url: createPrimitiveUrl("order"),
            label: "Ordre",
            compatibility: [SchemaOrgCompatibility.getOntologyCompatibilityArray("position")],
            cardinality: "0..1",
            description: "Ordre des éléments pour le visuel",
        },
    ],
}; //https://schema.org/position

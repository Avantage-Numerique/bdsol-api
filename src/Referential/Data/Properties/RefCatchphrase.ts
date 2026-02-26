import { RefProperty } from "../types";
import { createPrimitiveUrl, createRefType } from "../utils";
import compatibilitySchemaOrg from "@ref/Data/Compatibility/SchemaOrg";

export const refCatchphrase: RefProperty = {
    field: "catchphrase",
    ontologyProperty: "avnu:catchphrase",
    url: createPrimitiveUrl("catchphrase"),
    label: "Slogan",
    type: createRefType("string"),
    cardinality: "0..1",
    compatibility: [compatibilitySchemaOrg.getOntologyCompatibilityArray("slogan")],
    description: "Courte phrase d'accroche, moto, slogan, citation.",
};

import { RefProperty } from "@ref/Data/types";
import { createPrimitiveUrl, createRefType } from "@ref/Data/utils";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";

/**
 * type RefProperty for the Catchphrase
 */
const refCatchphrase: RefProperty = {
    field: "catchphrase",
    ontologyProperty: "avnu:catchphrase",
    url: createPrimitiveUrl("catchphrase"),
    label: "Slogan",
    type: createRefType("string"),
    cardinality: "0..1",
    compatibility: [SchemaOrgCompatibility.getOntologyCompatibilityArray("slogan")],
    description: "Courte phrase d'accroche, moto, slogan, citation.",
};

export { refCatchphrase };

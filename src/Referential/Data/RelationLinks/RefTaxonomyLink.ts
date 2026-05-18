import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefProperty } from "@ref/Data/types";
import { createRefType } from "@ref/Data/utils";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";

export const refTaxonomyLink: RefProperty = {
    //field: "location",
    ontologyProperty: "avnu:taxonomy",
    url: "/taxonomy",
    label: "Référence à une taxonomie",
    type: createRefType("reference", [EntityTypesEnum.taxonomy]),
    cardinality: "0..N",
    compatibility: [SchemaOrgCompatibility.getOntologyCompatibilityArray("keywords")],
    description: "Référence à une entité taxonomie.",
};

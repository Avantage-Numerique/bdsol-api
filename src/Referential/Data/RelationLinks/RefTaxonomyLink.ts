import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefProperty } from "../types";
import { createRefType } from "../utils";

export const refTaxonomyLink: RefProperty = {
    //field: "location",
    ontologyProperty: "avnu:relationLinks.taxonomy",
    url: "/taxonomyLink",
    label: "Référence à une taxonomie",
    type: createRefType("reference", [EntityTypesEnum.taxonomy]),
    cardinality: "0..N",
    compatibility: [],
    description: "Référence à une entité taxonomie.",
};

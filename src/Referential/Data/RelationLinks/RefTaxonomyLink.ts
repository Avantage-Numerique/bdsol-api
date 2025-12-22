import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefPropertyRelationLink } from "../types";

export const refTaxonomyLink: RefPropertyRelationLink = {
    //field: "location",
    ontologyProperty: "avnu:relationLinks.taxonomy",
    url: "/taxonomyLink",
    label: "Référence à une taxonomie",
    type: "id",
    entityRef: [EntityTypesEnum.taxonomy],
    cardinality: "0..N",
    compatibility: [],
    description: "Référence à une entité taxonomie.",
};

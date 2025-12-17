import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefPropertyRelationLink } from "../types";

export const refMainImageLink: RefPropertyRelationLink = {
    field: "mainImage",
    ontologyProperty: "avnu:relationLinks.mainImageLink",
    url: "/mainImageLink",
    label: "Image principale de profil",
    type: "id",
    entityRef: [EntityTypesEnum.media],
    cardinality: "0..1",
    compatibility: [],
    description: "Référence à une entité média, une image stockée.",
};

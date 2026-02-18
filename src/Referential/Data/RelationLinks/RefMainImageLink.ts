import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefProperty } from "../types";
import { createRefType } from "../utils";

export const refMainImageLink: RefProperty = {
    field: "mainImage",
    ontologyProperty: "avnu:relationLinks.mainImageLink",
    url: "/mainImageLink",
    label: "Image principale de profil",
    type: createRefType("reference", [EntityTypesEnum.media]),
    cardinality: "0..1",
    compatibility: [],
    description: "Référence à une entité média, une image stockée.",
};

import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefProperty } from "../types";
import { createRefType } from "../utils";

export const refPlaceLink: RefProperty = {
    field: "location",
    ontologyProperty: "avnu:relationLinks.placeLink",
    url: "/relationLinks.placeLink",
    label: "Référence à un lieu",
    type: createRefType("reference", [EntityTypesEnum.place]),
    cardinality: "0..N",
    compatibility: [],
    description: "Référence à une entité Place, qui décrit un lieu.",
};

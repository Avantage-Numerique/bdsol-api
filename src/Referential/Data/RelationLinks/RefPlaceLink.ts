import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefPropertyRelationLink } from "../types";

export const refPlaceLink: RefPropertyRelationLink = {
    field: "location",
    ontologyProperty: "avnu:relationLinks.placeLink",
    url: "/placeLink",
    label: "Référence à un lieu",
    type: "id",
    entityRef: [EntityTypesEnum.place],
    cardinality: "0..N",
    compatibility: [],
    description: "Référence à une entité Place, qui décrit un lieu.",
};

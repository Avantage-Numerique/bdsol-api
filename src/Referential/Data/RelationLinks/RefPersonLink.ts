import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefPropertyRelationLink } from "../types";

export const refPersonLink: RefPropertyRelationLink = {
    //field: "location",
    ontologyProperty: "avnu:relationLinks.person",
    url: "/personLink",
    label: "Référence à une personne",
    type: "id",
    entityRef: [EntityTypesEnum.person],
    cardinality: "0..N",
    compatibility: [],
    description: "Référence à une entité personne.",
};

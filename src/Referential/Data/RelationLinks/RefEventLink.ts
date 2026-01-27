import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefPropertyRelationLink } from "../types";

export const refEventLink: RefPropertyRelationLink = {
    //field: "location",
    ontologyProperty: "avnu:relationLinks.event",
    url: "/eventLink",
    label: "Référence à un événement",
    type: "id",
    entityRef: [EntityTypesEnum.event],
    cardinality: "0..N",
    compatibility: [],
    description: "Référence à une entité événement.",
};

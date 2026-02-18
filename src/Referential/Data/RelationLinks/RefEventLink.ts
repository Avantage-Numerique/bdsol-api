import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefProperty } from "../types";
import { createRefType } from "../utils";

export const refEventLink: RefProperty = {
    //field: "location",
    ontologyProperty: "avnu:relationLinks.event",
    url: "/eventLink",
    label: "Référence à un événement",
    type: createRefType("reference", [EntityTypesEnum.event]),
    cardinality: "0..N",
    compatibility: [],
    description: "Référence à une entité événement.",
};

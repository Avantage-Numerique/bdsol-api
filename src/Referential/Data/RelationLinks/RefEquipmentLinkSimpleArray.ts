import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefProperty } from "../types";
import { createRefType } from "../utils";

export const refEquipmentLink: RefProperty = {
    field: "equipment",
    url: "/equipmentLink",
    ontologyProperty: "avnu:relationLinks.equipmentLink",
    label: "Équipements liés",
    type: createRefType("reference", [EntityTypesEnum.equipment]),
    cardinality: "0..N",
    compatibility: [],
    description: "Référence à un ou plusieurs equipements utilisé ou liée à l'entité.",
};

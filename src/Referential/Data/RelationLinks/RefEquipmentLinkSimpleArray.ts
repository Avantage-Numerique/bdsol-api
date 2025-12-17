import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefPropertyRelationLink } from "../types";

export const refEquipmentLinkSimpleArray: RefPropertyRelationLink = {
    field: "equipment",
    url: "/equipmentLinkSimpleArray",
    ontologyProperty: "avnu:relationLinks.equipmentLink",
    label: "Équipements liés",
    type: "id",
    entityRef: [EntityTypesEnum.equipment],
    cardinality: "0..N",
    compatibility: [],
    description: "Référence à un ou plusieurs equipements utilisé ou liée à l'entité.",
};

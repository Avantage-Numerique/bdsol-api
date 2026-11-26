import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefReferenceField } from "@ref/Data/types";
import { createRefType } from "@ref/Data/utils";

export const refEquipmentLink: RefReferenceField = {
    cardinality: "0..1",
    type: createRefType("reference", [EntityTypesEnum.equipment]),
};
export const refEquipmentLinks: RefReferenceField = {
    cardinality: "0..N",
    type: createRefType("reference", [EntityTypesEnum.equipment]),
};

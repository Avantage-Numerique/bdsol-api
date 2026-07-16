import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefReferenceField } from "@ref/Data/types";
import { createRefType } from "@ref/Data/utils";

export const refPlaceLink: RefReferenceField = {
    cardinality: "0..1",
    type: createRefType("reference", [EntityTypesEnum.place]),
};
export const refPlaceLinks: RefReferenceField = {
    cardinality: "0..N",
    type: createRefType("reference", [EntityTypesEnum.place]),
};

import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefReferenceField } from "@ref/Data/types";
import { createRefType } from "@ref/Data/utils";

export const refMainImageLink: RefReferenceField = {
    cardinality: "0..1",
    type: createRefType("reference", [EntityTypesEnum.media]),
};

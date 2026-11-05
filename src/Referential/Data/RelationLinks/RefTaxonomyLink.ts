import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefReferenceField } from "@ref/Data/types";
import { createRefType } from "@ref/Data/utils";

export const refTaxonomyLink: RefReferenceField = {
    cardinality: "0..1",
    type: createRefType("reference", [EntityTypesEnum.taxonomy]),
};
export const refTaxonomyLinks: RefReferenceField = {
    cardinality: "0..N",
    type: createRefType("reference", [EntityTypesEnum.taxonomy]),
};

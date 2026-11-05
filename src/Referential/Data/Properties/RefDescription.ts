import { RefPrimitiveField } from "@ref/Data/types";
import { createRefType } from "@ref/Data/utils";

export const refDescription: RefPrimitiveField = {
    cardinality: "0..1",
    type: createRefType("string"),
};

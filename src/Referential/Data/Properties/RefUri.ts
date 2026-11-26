import { RefPrimitiveField } from "@ref/Data/types";
import { createRefType } from "@ref/Data/utils";

export const refUri: RefPrimitiveField = {
    cardinality: "0..1",
    type: createRefType("string"),
};

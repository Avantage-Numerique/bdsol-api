import { RefPrimitiveField } from "@ref/Data/types";
import { createRefType } from "@ref/Data/utils";

export const refType: RefPrimitiveField = {
    cardinality: "1..1",
    type: createRefType("string"),
};

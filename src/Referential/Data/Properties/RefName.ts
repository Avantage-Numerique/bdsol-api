import { RefPrimitiveField } from "@ref/Data/types";
import { createRefType } from "@ref/Data/utils";

export const refName: RefPrimitiveField = {
    cardinality: "1..1",
    type: createRefType("string"),
    constraints: { required: true, minLength: 2 },
};

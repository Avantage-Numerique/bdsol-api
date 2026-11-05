import { RefPrimitiveField } from "@ref/Data/types";
import { createRefType } from "@ref/Data/utils";

export const refShortDescription: RefPrimitiveField = {
    cardinality: "0..1",
    type: createRefType("string"),
    constraints: {
        maxLength: 160,
    },
};
//disambiguatingDescription

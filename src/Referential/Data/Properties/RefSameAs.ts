import { RefField, RefSchema } from "@ref/Data/types";
import { createRefType } from "@ref/Data/utils";

export const refSameAs: RefField = {
    type: createRefType("string"),
    cardinality: "0..N",
};

import { RefSchema } from "@ref/Data/types";
import { createRefType } from "@ref/Data/utils";

export const refSubMeta: RefSchema = {
    type: createRefType("object"),
    fields: {
        order: {
            cardinality: "0..1",
            type: createRefType("number"),
        },
    },
}; //https://schema.org/position

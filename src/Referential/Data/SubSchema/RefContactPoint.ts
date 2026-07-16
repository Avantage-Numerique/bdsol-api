import { RefSchema } from "@ref/Data/types";
import { createRefType } from "@ref/Data/utils";

export const refContactPoint: RefSchema = {
    type: createRefType("object"),
    fields: {
        email: {
            cardinality: "0..1",
            type: createRefType("string"),
        },
        tel: {
            cardinality: "0..1",
            type: createRefType("string"),
        },
        website: {
            cardinality: "0..1",
            type: createRefType("string"),
        },
    },
};

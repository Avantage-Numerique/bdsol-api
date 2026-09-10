import { RefSchema } from "@ref/Data/types";
import { createRefType } from "@ref/Data/utils";
import { refSubMeta } from "./RefSubMeta";

export const refSameAs: RefSchema = {
    type: createRefType("object"),
    fields: {
        label: {
            cardinality: "0..1",
            type: createRefType("string"),
        },
        url: {
            cardinality: "0..1",
            type: createRefType("string"),
        },
        subMeta: {
            cardinality: "0..1",
            type: createRefType("object"),
            fields: refSubMeta.fields,
        },
    },
};

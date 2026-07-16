import { RefSchema } from "@ref/Data/types";
import { createRefType } from "@ref/Data/utils";
import { MetaStates } from "@src/Moderation/Schemas/MetaSchema";

export const refMeta: RefSchema = {
    type: createRefType("object"),
    fields: {
        state: {
            cardinality: "0..1",
            type: createRefType("string"),
            constraints: { enum: MetaStates },
        },
        requestedBy: {
            cardinality: "0..1",
            type: createRefType("reference", []),
        },
        lastModifiedBy: {
            cardinality: "0..1",
            type: createRefType("reference", []),
        },
        message: {
            cardinality: "0..1",
            type: createRefType("string"),
        },
        statistics: {
            cardinality: "0..1",
            type: createRefType("number"),
        },
    },
};

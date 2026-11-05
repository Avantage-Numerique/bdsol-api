import { RefSchema } from "@ref/Data/types";
import { refTimeframe } from "./RefTimeframe";
import { createRefType } from "@ref/Data/utils";
import { refSubMeta } from "./RefSubMeta";

export const refScheduleBudget: RefSchema = {
    type: createRefType("object"),
    fields: {
        startDate: {
            cardinality: "0..1",
            type: createRefType("date"),
        },
        endDateEstimate: {
            cardinality: "0..1",
            type: createRefType("date"),
        },
        completionDate: {
            cardinality: "0..1",
            type: createRefType("date"),
        },
        estimatedTotalBudget: {
            cardinality: "0..1",
            type: createRefType("number"),
        },
        eta: {
            cardinality: "0..1",
            type: createRefType("string"),
        },
        timeframe: {
            cardinality: "0..N",
            type: createRefType("object"),
            fields: refTimeframe.fields,
        },
        subMeta: {
            cardinality: "0..1",
            type: createRefType("object"),
            fields: refSubMeta.fields,
        },
    },
};

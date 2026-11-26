import { RefSchema } from "@ref/Data/types";
import { refSubMeta } from "./RefSubMeta";
import { createRefType } from "@ref/Data/utils";

export const refSchedule: RefSchema = {
    type: createRefType("object"),
    fields: {
        name: {
            cardinality: "0..1",
            type: createRefType("string"),
        },
        startDate: {
            cardinality: "0..1",
            type: createRefType("date"),
        },
        startTime: {
            cardinality: "0..1",
            type: createRefType("string"),
        },
        endDate: {
            cardinality: "0..1",
            type: createRefType("date"),
        },
        endTime: {
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

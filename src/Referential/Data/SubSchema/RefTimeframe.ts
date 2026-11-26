import { BudgetRangeEnum, TimeframeEtaEnum } from "@src/Database/Schemas/ScheduleBudgetSchema";
import { RefSchema } from "@ref/Data/types";
import { createRefType } from "@ref/Data/utils";
import { refSubMeta } from "./RefSubMeta";

export const refTimeframe: RefSchema = {
    type: createRefType("object"),
    fields: {
        step: {
            cardinality: "1..1",
            type: createRefType("string"),
            constraints: { required: true },
        },
        eta: {
            cardinality: "0..1",
            type: createRefType("string"),
            constraints: { enum: TimeframeEtaEnum },
        },
        budgetRange: {
            cardinality: "0..1",
            type: createRefType("string"),
            constraints: { enum: BudgetRangeEnum },
        },
        subMeta: {
            cardinality: "0..1",
            type: createRefType("object"),
            fields: refSubMeta.fields,
        },
    },
};

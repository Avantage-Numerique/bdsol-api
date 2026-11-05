import { RefSchema } from "@ref/Data/types";
import { createRefType } from "@ref/Data/utils";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { refSubMeta } from "./RefSubMeta";

export const refMember: RefSchema = {
    type: createRefType("object"),
    fields: {
        member: {
            cardinality: "1..1",
            type: createRefType("reference", [EntityTypesEnum.person]),
            constraints: { required: true },
        },
        role: {
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

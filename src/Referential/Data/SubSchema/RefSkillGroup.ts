import { RefSchema } from "@ref/Data/types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { createRefType } from "@ref/Data/utils";
import { refSubMeta } from "./RefSubMeta";

export const refSkillGroup: RefSchema = {
    type: createRefType("object"),
    fields: {
        groupName: {
            cardinality: "1..1",
            type: createRefType("string"),
            constraints: { required: true },
        },
        skills: {
            cardinality: "0..N",
            type: createRefType("reference", [EntityTypesEnum.taxonomy]),
        },
        subMeta: {
            cardinality: "0..1",
            type: createRefType("object"),
            fields: refSubMeta.fields,
        },
    },
};

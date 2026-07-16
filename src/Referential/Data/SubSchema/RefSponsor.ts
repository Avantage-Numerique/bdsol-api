import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefSchema } from "@ref/Data/types";
import { createRefType } from "@ref/Data/utils";
import { refSubMeta } from "./RefSubMeta";

export const refSponsor: RefSchema = {
    type: createRefType("object"),
    fields: {
        name: {
            cardinality: "0..1",
            type: createRefType("string"),
        },
        entity: {
            cardinality: "0..1",
            type: createRefType("reference", [EntityTypesEnum.person, EntityTypesEnum.organisation]),
        },
        entityType: {
            cardinality: "1..1",
            type: createRefType("string"),
            constraints: { required: true, enum: { Person: "Person", Organisation: "Organisation" } },
        },
        subMeta: {
            cardinality: "0..1",
            type: createRefType("object"),
            fields: refSubMeta.fields,
        },
    },
};

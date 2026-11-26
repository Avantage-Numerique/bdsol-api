import { refEquipmentLink } from "@ref/Data/RelationLinks/RefEquipmentLink";
import { RefSchema } from "@ref/Data/types";
import { createRefType } from "@ref/Data/utils";
import { refSubMeta } from "./RefSubMeta";

export const refEquipmentLinkSchema: RefSchema = {
    type: createRefType("object"),
    fields: {
        equipment: refEquipmentLink,
        qty: {
            cardinality: "0..1",
            type: createRefType("number"),
        },
        subMeta: {
            cardinality: "0..1",
            type: createRefType("object"),
            fields: refSubMeta.fields,
        },
    },
};

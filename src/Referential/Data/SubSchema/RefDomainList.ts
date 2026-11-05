import { RefSchema } from "@ref/Data/types";
import { createRefType } from "@ref/Data/utils";
import { refTaxonomyLink } from "@ref/Data/RelationLinks/RefTaxonomyLink";
import { refSubMeta } from "./RefSubMeta";

export const refDomainList: RefSchema = {
    type: createRefType("object"),
    fields: {
        domain: refTaxonomyLink,
        subMeta: {
            cardinality: "0..1",
            type: createRefType("object"),
            fields: refSubMeta.fields,
        },
    },
};

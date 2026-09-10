import { refDescription } from "@ref/Data/Properties/RefDescription";
import { refShortDescription } from "@ref/Data/Properties/RefShortDescription";
import { refType } from "@ref/Data/Properties/RefType";
import { refMainImageLink } from "@ref/Data/RelationLinks/RefMainImageLink";
import { refTaxonomyLink } from "@ref/Data/RelationLinks/RefTaxonomyLink";
import { refSocialHandle } from "@ref/Data/SubSchema/RefSocialHandle";
import { RefSchema } from "@ref/Data/types";
import { createRefType } from "@ref/Data/utils";
import { refSameAs } from "@src/Referential/Data/SubSchema/RefSameAs";
import { refUri } from "../Properties/RefUri";
import { refMeta } from "../SubSchema/RefMeta";

export const refEquipment: RefSchema = {
    type: createRefType("object"),
    fields: {
        type: refType,
        equipmentType: {
            cardinality: "1..1",
            type: refTaxonomyLink.type,
            constraints: { required: true },
        },
        label: {
            cardinality: "0..1",
            type: createRefType("string"),
            //constraints: { minLength: 2 },
        },
        description: refDescription,
        shortDescription: refShortDescription,
        brand: {
            cardinality: "0..1",
            type: createRefType("string"),
        },
        modelName: {
            cardinality: "0..1",
            type: createRefType("string"),
        },
        mainImage: refMainImageLink,
        url: {
            cardinality: "0..N",
            type: createRefType("object"),
            fields: refSocialHandle.fields,
        },
        sameAs: {
            cardinality: "0..N",
            type: createRefType("object"),
            fields: refSameAs.fields,
        },
        meta: {
            cardinality: "0..1",
            type: createRefType("object"),
            fields: refMeta.fields,
        },
        uri: refUri,
    },
};

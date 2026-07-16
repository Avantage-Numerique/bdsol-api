import { RefSchema } from "@ref/Data/types";
import { createRefType } from "@ref/Data/utils";
import { refMeta } from "./RefMeta";

export const refLocation: RefSchema = {
    type: createRefType("object"),
    fields: {
        address: {
            cardinality: "0..1",
            type: createRefType("string"),
        },
        city: {
            cardinality: "0..1",
            type: createRefType("string"),
        },
        region: {
            cardinality: "0..1",
            type: createRefType("string"),
        },
        mrc: {
            cardinality: "0..1",
            type: createRefType("string"),
        },
        province: {
            cardinality: "0..1",
            type: createRefType("string"),
        },
        postalCode: {
            cardinality: "0..1",
            type: createRefType("string"),
        },
        country: {
            cardinality: "0..1",
            type: createRefType("string"),
        },
        latitude: {
            cardinality: "0..1",
            type: createRefType("string"),
        },
        longitude: {
            cardinality: "0..1",
            type: createRefType("string"),
        },
        meta: {
            cardinality: "0..1",
            type: createRefType("object"),
            fields: refMeta.fields,
        },
    },
};

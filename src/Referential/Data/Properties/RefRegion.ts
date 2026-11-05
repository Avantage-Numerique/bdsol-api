import { RegionEnum } from "@src/SubProperty/Badges/RegionEnum";
import { RefPrimitiveField } from "@ref/Data/types";
import { createRefType } from "@ref/Data/utils";

export const refRegion: RefPrimitiveField = {
    cardinality: "0..1",
    type: createRefType("string"),
    constraints: {
        enum: RegionEnum,
    },
};

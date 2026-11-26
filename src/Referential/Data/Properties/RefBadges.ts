import { RefPrimitiveField } from "@ref/Data/types";
import { createRefType } from "@ref/Data/utils";

export const refBadges: RefPrimitiveField = {
    cardinality: "0..N",
    type: createRefType("string"),
    //constraints : enum : badgeenum
};

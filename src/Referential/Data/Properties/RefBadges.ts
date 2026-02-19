import { RefProperty } from "../types";
import { createPrimitiveUrl, createRefType } from "../utils";

export const refBadges: RefProperty = {
    field: "badges",
    ontologyProperty: "avnu:badges",
    url: createPrimitiveUrl("badges"),
    label: "Badges",
    type: createRefType("string"),
    cardinality: "0..N",
    compatibility: [],
    description:
        "Liste de badges donnés à une personne. Chaque badge indique une information supplémentaire en lien avec la personne. Non-modifiable.",
};

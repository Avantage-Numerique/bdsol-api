import { RefProperty } from "../types";
import { createPrimitiveUrl, createRefType } from "../utils";
import AvnuCompatibility from "@ref/Data/Compatibility/Avnu";

export const refBadges: RefProperty = {
    field: "badges",
    ontologyProperty: "avnu:badges",
    url: createPrimitiveUrl("badges"),
    label: "Badges",
    type: createRefType("string"),
    cardinality: "0..N",
    compatibility: [AvnuCompatibility.onlyCompatibleWithThis()],
    description:
        "Liste de badges donnés à une personne. Chaque badge indique une information supplémentaire en lien avec la personne. Non-modifiable.",
};

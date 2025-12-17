import { RefPropertyPrimitive } from "../types";

export const refBadges: RefPropertyPrimitive = {
    field: "badges",
    ontologyProperty: "avnu:badges",
    url: "/badges",
    label: "Badges",
    type: "string",
    cardinality: "0..N",
    compatibility: [],
    description:
        "Liste de badges donnés à une personne. Chaque badge indique une information supplémentaire en lien avec la personne. Non-modifiable.",
};

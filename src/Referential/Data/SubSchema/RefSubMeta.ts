import { RefProperty } from "../types";
import { createPrimitiveUrl, createRefType } from "../utils";

export const refSubMeta: RefProperty = {
    field: "subMeta",
    ontologyProperty: "avnu:submeta",
    label: "Sous-méta",
    cardinality: "0..1",
    url: "/submeta",
    description: "Objet de méta qui conserve des informations pour les sous-schéma.",

    type: createRefType("object"),
    ref: [
        {
            field: "order",
            type: createRefType("number"),
            ontologyProperty: "avnu:order",
            url: createPrimitiveUrl("order"),
            label: "Ordre",
            cardinality: "0..1",
            description: "Order des éléments pour le visuel",
        },
    ],
};

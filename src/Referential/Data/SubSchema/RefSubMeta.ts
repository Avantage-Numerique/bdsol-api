import { RefEntityOrSchema } from "../types";

export const refSubMeta: RefEntityOrSchema = {
    field: "subMeta",
    ontologyProperty: "avnu:submeta",
    label: "Sous-méta",
    cardinality: "0..1",
    url: "/submeta",
    description: "Objet de méta qui conserve des informations pour les sous-schéma.",
    ref: [
        {
            field: "order",
            type: "number",
            //ontologyProperty: "avnu:order",
            label: "Ordre",
            cardinality: "0..1",
            description: "Order des éléments pour le visuel",
        },
    ],
};

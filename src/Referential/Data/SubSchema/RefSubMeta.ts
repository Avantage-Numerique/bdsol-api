import { RefProperty } from "../types";
import { createRefType } from "../utils";
import { refOrder } from "@ref/Data/Properties/RefOrder";

export const refSubMeta: RefProperty = {
    field: "subMeta",
    ontologyProperty: "avnu:submeta",
    label: "Sous-méta",
    cardinality: "0..1",
    url: "/submeta",
    description: "Objet de méta qui conserve des informations pour les sous-schéma.",

    type: createRefType("object"),
    ref: [{ ...refOrder }],
}; //https://schema.org/position

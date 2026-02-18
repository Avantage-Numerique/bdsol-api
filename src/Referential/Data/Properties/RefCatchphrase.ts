import { RefProperty } from "../types";
import { createRefType } from "../utils";

export const refCatchphrase: RefProperty = {
    field: "catchphrase",
    ontologyProperty: "avnu:catchphrase",
    url: "/catchphrase",
    label: "Slogan",
    type: createRefType("string"),
    cardinality: "0..1",
    compatibility: [],
    description: "Courte phrase d'accroche, moto, slogan, citation.",
};

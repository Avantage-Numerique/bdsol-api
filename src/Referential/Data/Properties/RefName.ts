import { RefProperty } from "../types";
import { createRefType } from "../utils";

export const refName: RefProperty = {
    field: "name",
    ontologyProperty: "avnu:name",
    type: createRefType("string"),
    url: "/name",
    label: "Nom",
    cardinality: "1..1",
    description: "Nom de l'organisation",
    compatibility: [],
    //note: "",
};

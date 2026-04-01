import { RefProperty } from "../types";
import { createPrimitiveUrl, createRefType } from "../utils";

export const refShortDescription: RefProperty = {
    field: "shortDescription",
    ontologyProperty: "avnu:shortDescription",
    url: createPrimitiveUrl("shortDescription"),
    label: "Description courte",
    type: createRefType("string"),
    cardinality: "0..1",
    compatibility: [],
    description: "Version courte de description pour le SEO",
    constraints: {
        maxLength: 160,
    },
    note: "Si ce champs est vide, alors il sera rempli automatiquement avec la description de l'entité.",
};

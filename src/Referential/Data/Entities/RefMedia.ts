import { RefProperty } from "../types";
import { createRefType } from "../utils";

export const refMedia: RefProperty = {
    label: "Média",
    description: "Usage interne seulement. Référence un média dans la plateforme par son identifiant unique.",
    ontologyProperty: "avnu:media",
    url: "/media",

    type: createRefType("object"),
    ref: [],
};

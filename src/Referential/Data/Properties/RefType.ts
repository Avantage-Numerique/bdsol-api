import { RefProperty } from "../types";
import { createRefType } from "../utils";

export const refType: RefProperty = {
    field: "type",
    ontologyProperty: "avnu:type",
    type: createRefType("string"),
    url: "/type",
    label: "Type d'entité",
    cardinality: "1..1",
    compatibility: [
        //Pas le même vocabulaire https://datascene.ca/references/vocabulaires/types_de_contributeurs/
        /* {
            externalSource: {
                name: "Datascene",
                //sparqlEndpoint: ""
            },
            mapping: {
                externalField: "Type de contributeur",
                //ontologyProperty: "",
                //ontologyUri: "",
            },
            documentationUrl: "https://datascene.ca/references/vocabulaires/types_de_contributeurs/",
        }, */
    ],
    description: "Type de l'entité statique. Virtuel, statique et non-modifiable.",
};

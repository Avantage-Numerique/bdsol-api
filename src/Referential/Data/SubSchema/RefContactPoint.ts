import { RefProperty } from "../types";
import { createRefType } from "../utils";

export const refContactPoint: RefProperty = {
    field: "contactPoint",
    ontologyProperty: "avnu:contactPoint",
    url: "/contactpoint",
    label: "Moyen de contact",
    cardinality: "0..1",
    description: "",

    type: createRefType("object"),
    ref: [
        {
            field: "email",
            type: createRefType("string"),
            //ontologyProperty: "avnu:email",
            //url: "/email",
            label: "Courriel",
            cardinality: "0..1",
            description: "Courriel",
            compatibility: [],
            //note:"",
        },
        {
            field: "tel",
            type: createRefType("string"),
            //ontologyProperty: "avnu:tel",
            //url: "/tel",
            label: "Numéro de téléphone",
            cardinality: "0..1",
            description: "Numéro de téléphone",
            compatibility: [],
            //note:"",
        },
        {
            field: "website",
            type: createRefType("string"),
            //ontologyProperty: "avnu:website",
            //url: "/website",
            label: "Site web",
            cardinality: "0..1",
            description: "Site web principal",
            compatibility: [],
            //note:"",
        },
    ],
};

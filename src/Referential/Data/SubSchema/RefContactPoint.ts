import { RefProperty } from "../types";
import { createPrimitiveUrl, createRefType } from "../utils";
import AvnuCompatibility from "@ref/Data/Compatibility/Avnu";

export const refContactPoint: RefProperty = {
    field: "contactPoint",
    ontologyProperty: "avnu:contactPoint",
    url: "/contactpoint",
    label: "Moyen de contact",
    cardinality: "0..1",
    description: "",

    type: createRefType("object"),
    compatibility: [AvnuCompatibility.compatibilityMessage()],
    ref: [
        {
            field: "email",
            type: createRefType("string"),
            ontologyProperty: "avnu:email",
            url: createPrimitiveUrl("email"),
            label: "Courriel",
            cardinality: "0..1",
            description: "Courriel",
            //compatibility: [],
            //note:"",
        },
        {
            field: "tel",
            type: createRefType("string"),
            ontologyProperty: "avnu:tel",
            url: createPrimitiveUrl("tel"),
            label: "Numéro de téléphone",
            cardinality: "0..1",
            description: "Numéro de téléphone",
            compatibility: [],
            //note:"",
        },
        {
            field: "website",
            type: createRefType("string"),
            ontologyProperty: "avnu:website",
            url: createPrimitiveUrl("website"),
            label: "Site web",
            cardinality: "0..1",
            description: "Site web principal",
            compatibility: [],
            //note:"",
        },
    ],
};

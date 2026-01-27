import { RefPropertyPrimitive } from "../types";

export const refAlternateName: RefPropertyPrimitive = {
    field: "alternateName",
    type: "string",
    ontologyProperty: "avnu:alternateName",
    url: "/alternateName",
    label: "Nom secondaire",
    cardinality: "0..1",
    description: "Autre nom sous lequel l'entité est également connu.",
    compatibility: [
        //schemaOrg:alternateName
    ],
    //note: "",
};

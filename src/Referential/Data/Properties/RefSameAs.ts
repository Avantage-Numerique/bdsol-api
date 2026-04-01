import { RefProperty } from "../types";
import { createPrimitiveUrl, createRefType } from "../utils";
import ArtsdataCompatibility from "@ref/Data/Compatibility/Artsdata";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";

export const refSameAs: RefProperty = {
    field: "sameAs",
    ontologyProperty: "avnu:sameAs",
    type: createRefType("string"),
    url: createPrimitiveUrl("name"),
    label: "Same As",
    cardinality: "0..N",
    description: "Liste d'url qui réprésente l'entités d'une autre manière",
    compatibility: [
        ArtsdataCompatibility.getOntologyCompatibilityArray("sameAs", "sameAs", "https://schema.org/sameAs"),
        SchemaOrgCompatibility.getOntologyCompatibilityArray("sameAs"),
    ],
    //note: "",
};

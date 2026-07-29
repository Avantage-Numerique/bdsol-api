import { RefSchema } from "@ref/Data/types";
import { createPrimitiveUrl, createRefType } from "@ref/Data/utils";
import ArtsdataCompatibility from "@src/Compatibility/ArtsData/Artsdata";
import SchemaOrgCompatibility from "@src/Compatibility/SchemaOrg/SchemaOrg";

/* export const refSameAs: RefProperty = {
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
}; */

import { RefProperty } from "../types";
import compatibilitySchemaOrg from "@ref/Data/Compatibility/SchemaOrg";
import compatibilityDataScene from "@ref/Data/Compatibility/DataScene";
import { createPrimitiveUrl, createRefType } from "../utils";

export const refAlternateName: RefProperty = {
    field: "alternateName",
    type: createRefType("string"),
    ontologyProperty: "avnu:alternateName",
    url: createPrimitiveUrl("alternateName"),
    label: "Nom secondaire",
    cardinality: "0..1",
    description: "Autre nom sous lequel l'entité est également connu.",
    compatibility: [
        compatibilitySchemaOrg.getOntologyCompatibilityArray("alternateName"),
        compatibilityDataScene.getOntologyCompatibilityArray(
            "alternateName",
            "alternateName",
            "https://documentation.datascene.ca/references/show/#5-propriete-spectacle-show-alternatename-nom-alternatif"
        ),
    ],
    //note: "",
};

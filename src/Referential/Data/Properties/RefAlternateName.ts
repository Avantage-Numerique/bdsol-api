import { RefPropertyPrimitive } from "../types";
import compatibilitySchemaOrg from "@ref/Data/Compatibility/SchemaOrg";
import compatibilityDataScene from "@ref/Data/Compatibility/DataScene";

export const refAlternateName: RefPropertyPrimitive = {
    field: "alternateName",
    type: "string",
    ontologyProperty: "avnu:alternateName",
    url: "/alternateName",
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

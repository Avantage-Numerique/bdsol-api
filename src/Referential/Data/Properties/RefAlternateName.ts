import { RefProperty } from "@ref/Data/types";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";
import DataSceneCompatibility from "@ref/Data/Compatibility/DataScene";
import { createPrimitiveUrl, createRefType } from "@ref/Data/utils";

export const refAlternateName: RefProperty = {
    field: "alternateName",
    type: createRefType("string"),
    ontologyProperty: "avnu:alternateName",
    url: createPrimitiveUrl("alternateName"),
    label: "Nom secondaire",
    cardinality: "0..1",
    description: "Autre nom sous lequel l'entité est également connu.",
    compatibility: [
        SchemaOrgCompatibility.getOntologyCompatibilityArray("alternateName"),
        DataSceneCompatibility.getOntologyCompatibilityArray(
            "alternateName",
            "alternateName",
            "https://documentation.datascene.ca/references/show/#5-propriete-spectacle-show-alternatename-nom-alternatif"
        ),
    ],
    //note: "",
};

import { RefProperty } from "@ref/Data/types";
import { createPrimitiveUrl, createRefType } from "@ref/Data/utils";
import ArtsdataCompatibility from "@ref/Data/Compatibility/Artsdata";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";
import DataSceneCompatibility from "@ref/Data/Compatibility/DataScene";

export const refLicense: RefProperty = {
    field: "license",
    ontologyProperty: "avnu:license",
    type: createRefType("string"),
    url: createPrimitiveUrl("license"),
    label: "Licence",
    cardinality: "0..1",
    description: "Url vers la licence pour l'image",
    compatibility: [
        ArtsdataCompatibility.getOntologyCompatibilityArray("license", "license", "https://schema.org/license"),
        SchemaOrgCompatibility.getOntologyCompatibilityArray("license"),
        DataSceneCompatibility.getOntologyCompatibilityArray(
            "license",
            "license",
            "https://documentation.datascene.ca/references/media/#6-propriete-media-media-license-licence"
        ),
    ],
    //note: "",
};

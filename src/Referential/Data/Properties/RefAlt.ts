import { RefProperty } from "@ref/Data/types";
import { createPrimitiveUrl, createRefType } from "@ref/Data/utils";
import ArtsdataCompatibility from "@ref/Data/Compatibility/Artsdata";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";
import DataSceneCompatibility from "@ref/Data/Compatibility/DataScene";

export const refAlt: RefProperty = {
    field: "alt",
    ontologyProperty: "avnu:alt",
    type: createRefType("string"),
    url: createPrimitiveUrl("alt"),
    label: "Alt",
    cardinality: "0..1",
    description: "Texte alternative pour représenter l'objet.",
    compatibility: [
        ArtsdataCompatibility.getOntologyCompatibilityArray("caption", "caption", "https://schema.org/caption"),
        SchemaOrgCompatibility.getOntologyCompatibilityArray("caption"),
        DataSceneCompatibility.getOntologyCompatibilityArray(
            "description",
            "description",
            "https://documentation.datascene.ca/references/media/#9-propriete-media-media-description-description"
        ),
    ],
    //note: "",
};

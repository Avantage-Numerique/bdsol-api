import { RefProperty } from "@ref/Data/types";
import { createPrimitiveUrl, createRefType } from "@ref/Data/utils";
import ArtsdataCompatibility from "@ref/Data/Compatibility/Artsdata";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";
import DataSceneCompatibility from "@ref/Data/Compatibility/DataScene";

export const refUrl: RefProperty = {
    field: "url",
    ontologyProperty: "avnu:url",
    type: createRefType("string"),
    url: createPrimitiveUrl("url"),
    label: "Url",
    cardinality: "0..1",
    description: "Url, adresse web, pour l'image",
    compatibility: [
        ArtsdataCompatibility.getOntologyCompatibilityArray(
            "contentUrl",
            "contentUrl",
            "https://schema.org/contentUrl"
        ),
        SchemaOrgCompatibility.getOntologyCompatibilityArray("contentUrl"),
        DataSceneCompatibility.getOntologyCompatibilityArray(
            "url",
            "url",
            "https://documentation.datascene.ca/references/media/#4-propriete-media-media-url-url"
        ),
    ],
    //note: "",
};

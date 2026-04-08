import { RefProperty } from "../types";
import { createRefType } from "../utils";
import ArtsdataCompatibility from "@ref/Data/Compatibility/Artsdata";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";
import DataSceneCompatibility from "@ref/Data/Compatibility/DataScene";

export const refMedia: RefProperty = {
    label: "Média",
    description: "Usage interne seulement. Référence un média dans la plateforme par son identifiant unique.",
    ontologyProperty: "avnu:Media",
    url: "/media",
    type: createRefType("object"),
    compatibility: [
        ArtsdataCompatibility.getOntologyCompatibilityArray("image", "ImageObject", "https://schema.org/ImageObject"),
        SchemaOrgCompatibility.getOntologyCompatibilityArray("MediaObject"),
        DataSceneCompatibility.getOntologyCompatibilityArray("media", "Media"),
    ],
    ref: [
        //enum ImageLicenceEnum
    ],
};

import { RefProperty } from "../types";
import { createRefType } from "../utils";
import compatibilityAvnu from "@ref/Data/Compatibility/Avnu";
import compatibilityArtsdata from "@ref/Data/Compatibility/Artsdata";
import compatibilitySchemaOrg from "@ref/Data/Compatibility/SchemaOrg";
import compatibilityDataScene from "@ref/Data/Compatibility/DataScene";

export const refMedia: RefProperty = {
    label: "Média",
    description: "Usage interne seulement. Référence un média dans la plateforme par son identifiant unique.",
    ontologyProperty: "avnu:media",
    url: "/media",
    type: createRefType("object"),
    compatibility: [
        compatibilityAvnu.getOntologyCompatibilityArray("Media"),
        compatibilityArtsdata.getOntologyCompatibilityArray("image", "ImageObject", "https://schema.org/ImageObject"),
        compatibilitySchemaOrg.getOntologyCompatibilityArray("MediaObject"),
        compatibilityDataScene.getOntologyCompatibilityArray("media", "Media"),
    ],
    ref: [
        //enum ImageLicenceEnum
    ],
};

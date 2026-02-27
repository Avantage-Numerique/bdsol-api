import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefProperty } from "../types";
import { createRefType } from "../utils";
import compatibilityAvnu from "@ref/Data/Compatibility/Avnu";
import compatibilityArtsdata from "@ref/Data/Compatibility/Artsdata";
import compatibilitySchemaOrg from "@ref/Data/Compatibility/SchemaOrg";
import compatibilityDataScene from "@ref/Data/Compatibility/DataScene";

export const refMainImageLink: RefProperty = {
    field: "mainImage",
    ontologyProperty: "avnu:mainImage",
    url: "/mainImage",
    label: "Image principale de profil",
    type: createRefType("reference", [EntityTypesEnum.media]),
    cardinality: "0..1",
    compatibility: [
        compatibilityAvnu.getOntologyCompatibilityArray("Media"),
        compatibilityArtsdata.getOntologyCompatibilityArray("image", "ImageObject", "https://schema.org/ImageObject"),
        compatibilitySchemaOrg.getOntologyCompatibilityArray("MediaObject"),
        compatibilityDataScene.getOntologyCompatibilityArray("media", "Media"),
    ],
    description: "Référence à une entité média, une image stockée.",
};

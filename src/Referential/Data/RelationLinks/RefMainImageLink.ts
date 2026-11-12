import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefProperty } from "@ref/Data/types";
import { createRefType } from "@ref/Data/utils";
import ArtsdataCompatibility from "@ref/Data/Compatibility/Artsdata";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";
import DataSceneCompatibility from "@ref/Data/Compatibility/DataScene";

export const refMainImageLink: RefProperty = {
    field: "mainImage",
    ontologyProperty: "avnu:mainImage",
    url: "/mainImage",
    label: "Image principale de profil",
    type: createRefType("reference", [EntityTypesEnum.media]),
    cardinality: "0..1",
    compatibility: [
        ArtsdataCompatibility.getOntologyCompatibilityArray("image", "ImageObject", "https://schema.org/ImageObject"),
        SchemaOrgCompatibility.getOntologyCompatibilityArray("MediaObject"),
        DataSceneCompatibility.getOntologyCompatibilityArray("media", "Media"),
    ],
    description: "Référence à une entité média, une image stockée.",
};

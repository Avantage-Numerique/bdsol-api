import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefProperty } from "../types";
import { createRefType } from "../utils";
import compatibilityArtsdata from "@ref/Data/Compatibility/Artsdata";
import compatibilitySchemaOrg from "@ref/Data/Compatibility/SchemaOrg";
import compatibilityDataScene from "@ref/Data/Compatibility/DataScene";

export const refPlaceLink: RefProperty = {
    field: "location",
    ontologyProperty: "avnu:relationLinks.placeLink",
    url: "/relationLinks.placeLink",
    label: "Référence à un lieu",
    type: createRefType("reference", [EntityTypesEnum.place]),
    cardinality: "0..N",
    compatibility: [
        compatibilityArtsdata.getOntologyCompatibilityArray(
            "place",
            "Place",
            "https://docs.artsdata.ca/classes/place.html"
        ),
        compatibilitySchemaOrg.getOntologyCompatibilityArray("Place"),
        compatibilityDataScene.getOntologyCompatibilityArray("place"),
    ],
    description: "Référence à une entité Place, qui décrit un lieu.",
};

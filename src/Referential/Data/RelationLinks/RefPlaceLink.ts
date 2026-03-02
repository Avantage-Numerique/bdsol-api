import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefProperty } from "../types";
import { createRefType } from "../utils";
import ArtsdataCompatibility from "@ref/Data/Compatibility/Artsdata";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";
import DataSceneCompatibility from "@ref/Data/Compatibility/DataScene";

export const refPlaceLink: RefProperty = {
    field: "location",
    ontologyProperty: "avnu:relationLinks.placeLink",
    url: "/relationLinks.placeLink",
    label: "Référence à un lieu",
    type: createRefType("reference", [EntityTypesEnum.place]),
    cardinality: "0..N",
    compatibility: [
        ArtsdataCompatibility.getOntologyCompatibilityArray(
            "place",
            "Place",
            "https://docs.artsdata.ca/classes/place.html"
        ),
        SchemaOrgCompatibility.getOntologyCompatibilityArray("Place"),
        DataSceneCompatibility.getOntologyCompatibilityArray("place"),
    ],
    description: "Référence à une entité Place, qui décrit un lieu.",
};

import { RefProperty } from "../types";
import { createPrimitiveUrl, createRefType } from "../utils";
import ArtsdataCompatibility from "@ref/Data/Compatibility/Artsdata";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";
import DataSceneCompatibility from "@ref/Data/Compatibility/DataScene";

export const refTitle: RefProperty = {
    field: "title",
    ontologyProperty: "avnu:title",
    type: createRefType("string"),
    url: createPrimitiveUrl("title"),
    label: "Titre",
    cardinality: "0..1",
    description: "Titre de l'image",
    compatibility: [
        ArtsdataCompatibility.getOntologyCompatibilityArray(
            "name",
            "name",
            "https://docs.artsdata.ca/classes/organization.html"
        ),
        SchemaOrgCompatibility.getOntologyCompatibilityArray("name"),
        DataSceneCompatibility.getOntologyCompatibilityArray(
            "name",
            "name",
            "https://documentation.datascene.ca/references/contributor/#4-propriete-contributeur-contributor-name-nom"
        ),
    ],
    //note: "",
};

import { RefProperty } from "../types";
import { createPrimitiveUrl, createRefType } from "../utils";
import ArtsdataCompatibility from "@ref/Data/Compatibility/Artsdata";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";
import DataSceneCompatibility from "@ref/Data/Compatibility/DataScene";

export const refName: RefProperty = {
    field: "name",
    ontologyProperty: "avnu:name",
    type: createRefType("string"),
    url: createPrimitiveUrl("name"),
    label: "Nom",
    cardinality: "1..1",
    description: "Nom de l'organisation",
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

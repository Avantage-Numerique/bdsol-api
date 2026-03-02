import { RefProperty } from "../types";
import DataSceneCompatibility from "@ref/Data/Compatibility/DataScene";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";
import ArtsdataCompatibility from "@ref/Data/Compatibility/Artsdata";
import { createPrimitiveUrl, createRefType } from "../utils";

export const refDescription: RefProperty = {
    field: "description",
    ontologyProperty: "avnu:description",
    url: createPrimitiveUrl("description"),
    label: "Description",
    type: createRefType("string"),
    cardinality: "0..1",
    compatibility: [
        SchemaOrgCompatibility.getOntologyCompatibilityArray("description"),
        ArtsdataCompatibility.getOntologyCompatibilityArray("alternateName"),
        DataSceneCompatibility.getOntologyCompatibilityArray(
            "description",
            "Description",
            "https://documentation.datascene.ca/references/contributor/#6-propriete-contributeur-contributor-description-description"
        ),
    ],
    description: "Description, à propos, biographie. Il s'agit d'un court texte pour décrire la personne.",
};

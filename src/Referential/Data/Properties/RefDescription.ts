import { RefProperty } from "../types";
import compatibilityDataScene from "@ref/Data/Compatibility/DataScene";
import compatibilitySchemaOrg from "@ref/Data/Compatibility/SchemaOrg";
import compatibilityArtsdata from "@ref/Data/Compatibility/Artsdata";
import { createRefType } from "../utils";

export const refDescription: RefProperty = {
    field: "description",
    ontologyProperty: "avnu:description",
    url: "/description",
    label: "Description",
    type: createRefType("string"),
    cardinality: "0..1",
    compatibility: [
        compatibilitySchemaOrg.getOntologyCompatibilityArray("description"),
        compatibilityArtsdata.getOntologyCompatibilityArray("alternateName"),
        compatibilityDataScene.getOntologyCompatibilityArray(
            "description",
            "Description",
            "https://documentation.datascene.ca/references/contributor/#6-propriete-contributeur-contributor-description-description"
        ),
    ],
    description: "Description, à propos, biographie. Il s'agit d'un court texte pour décrire la personne.",
};

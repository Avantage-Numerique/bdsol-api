import { RefPropertyPrimitive } from "../types";
import compatibilityDataScene from "@ref/Data/Compatibility/DataScene";
import compatibilitySchemaOrg from "@ref/Data/Compatibility/SchemaOrg";
import compatibilityArtsdata from "@ref/Data/Compatibility/Artsdata";

export const refDescription: RefPropertyPrimitive = {
    field: "description",
    ontologyProperty: "avnu:description",
    label: "Description",
    type: "string",
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

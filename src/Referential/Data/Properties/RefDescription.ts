import { RefPropertyPrimitive } from "../types";
import compatibilityDataScene from "@ref/Data/Compatibility/DataScene";

export const refDescription: RefPropertyPrimitive = {
    field: "description",
    ontologyProperty: "avnu:description",
    label: "Description",
    type: "string",
    cardinality: "0..1",
    compatibility: [
        {
            externalSource: {
                name: "Schema.org",
            },
            mapping: {
                externalField: "description",
                ontologyProperty: "schema:description",
                ontologyUri: "https://schema.org/description",
            },
            documentationUrl: "https://schema.org/description",
        },
        compatibilityDataScene.getOntologyCompatibilityArray(
            "description",
            "Description",
            "https://documentation.datascene.ca/references/contributor/#4-propriete-contributeur-contributor-name-nom"
        ),
    ],
    description: "Description, à propos, biographie. Il s'agit d'un court texte pour décrire la personne.",
};

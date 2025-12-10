import { RefPropertyPrimitive } from "../types";

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
        {
            externalSource: {
                name: "Datascene",
            },
            mapping: {
                externalField: "Description",
                //ontologyProperty: "",
                //ontologyUri: "",
            },
            documentationUrl: "https://datascene.ca/references/proprietes/contributeur/",
        },
    ],
    description: "Description, à propos, biographie. Il s'agit d'un court texte pour décrire la personne.",
};

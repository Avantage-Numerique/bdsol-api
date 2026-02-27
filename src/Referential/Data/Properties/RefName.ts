import { RefProperty } from "../types";
import { createPrimitiveUrl, createRefType } from "../utils";
import compatibilityArtsdata from "@ref/Data/Compatibility/Artsdata";
import compatibilitySchemaOrg from "@ref/Data/Compatibility/SchemaOrg";
import compatibilityDataScene from "@ref/Data/Compatibility/DataScene";

export const refName: RefProperty = {
    field: "name",
    ontologyProperty: "avnu:name",
    type: createRefType("string"),
    url: createPrimitiveUrl("name"),
    label: "Nom",
    cardinality: "1..1",
    description: "Nom de l'organisation",
    compatibility: [
        compatibilityArtsdata.getOntologyCompatibilityArray(
            "name",
            "name",
            "https://docs.artsdata.ca/classes/organization.html"
        ),
        compatibilitySchemaOrg.getOntologyCompatibilityArray("name"),
        compatibilityDataScene.getOntologyCompatibilityArray(
            "name",
            "name",
            "https://documentation.datascene.ca/references/contributor/#4-propriete-contributeur-contributor-name-nom"
        ),
    ],
    //note: "",
};

import { RefProperty } from "@ref/Data/types";
import { createPrimitiveUrl, createRefType } from "@ref/Data/utils";
import ArtsdataCompatibility from "@ref/Data/Compatibility/Artsdata";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";
import DataSceneCompatibility from "@ref/Data/Compatibility/DataScene";

export const refShortDescription: RefProperty = {
    field: "shortDescription",
    ontologyProperty: "avnu:shortDescription",
    url: createPrimitiveUrl("shortDescription"),
    label: "Description courte",
    type: createRefType("string"),
    cardinality: "0..1",
    compatibility: [
        ArtsdataCompatibility.getOntologyCompatibilityArray(
            "abstract",
            "abstract",
            "https://docs.artsdata.ca/classes/organization.html"
        ),
        SchemaOrgCompatibility.getOntologyCompatibilityArray("abstract"),
        DataSceneCompatibility.getOntologyCompatibilityArray(
            "shortDescription",
            "shortDescription",
            "https://documentation.datascene.ca/references/show/#7-propriete-spectacle-show-shortdescription-description-courte"
        ),
    ],
    description: "Version courte de la description, qui peut être définie par un utilisateur ou non.",
    constraints: {
        maxLength: 160,
    },
    note: "Si la propriété n'a pas été définie, AVNU génère une version courte de la description en mode texte seulement. Utilisé dans la balise méta description de la page, et pour les données structurées nécessitant la propriété shortDescription.",
};
//disambiguatingDescription

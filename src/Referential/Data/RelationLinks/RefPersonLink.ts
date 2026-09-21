import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefProperty } from "@ref/Data/types";
import { createRefType } from "@ref/Data/utils";
import ArtsdataCompatibility from "@ref/Data/Compatibility/Artsdata";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";
import DataSceneCompatibility from "@ref/Data/Compatibility/DataScene";

export const refPersonLink: RefProperty = {
    ontologyProperty: "avnu:person",
    url: "/member", //member//relationLinks.personLink
    label: "Référence à une personne",
    type: createRefType("reference", [EntityTypesEnum.person]),
    cardinality: "0..N",
    compatibility: [
        ArtsdataCompatibility.getOntologyCompatibilityArray(
            "Person",
            "Person",
            "https://docs.artsdata.ca/classes/person.html"
        ),
        SchemaOrgCompatibility.getOntologyCompatibilityArray("Person"),
        DataSceneCompatibility.getOntologyCompatibilityArray(
            "contributor",
            "Contributor (type:Person)",
            "https://documentation.datascene.ca/references/contributor/#1-propriete-contributeur-contributor-type"
        ),
    ],
    description: "Référence à une entité personne.",
};

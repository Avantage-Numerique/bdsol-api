import { RefProperty } from "../types";
import { createRefType } from "../utils";
import { refMember } from "./RefMember";
import AvnuCompatibility from "@ref/Data/Compatibility/Avnu";
import ArtsdataCompatibility from "@ref/Data/Compatibility/Artsdata";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";
import DataSceneCompatibility from "@ref/Data/Compatibility/DataScene";

export const refTeam: RefProperty = {
    field: "team",
    ontologyProperty: "avnu:team",
    url: "/team",
    label: "Équipe",
    cardinality: "0..N",
    description: "Liste des membres d'une équipe et un libellé de leur fonction.",
    compatibility: [
        AvnuCompatibility.getOntologyCompatibilityArray("Person"),
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
    //note: "",

    type: createRefType("object"),
    ref: [{ ...refMember }],
};

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
        SchemaOrgCompatibility.getOntologyCompatibilityArray("member"),
        DataSceneCompatibility.getOntologyCompatibilityArray(
            "hasMembers",
            "hasMembers (of type:Person)",
            "https://documentation.datascene.ca/references/contributor/#11-propriete-contributeur-contributor-hasmembers-membres"
        ),
    ],
    //note: "",

    type: createRefType("object"),
    ref: [{ ...refMember }],
};

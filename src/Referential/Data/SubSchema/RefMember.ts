import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefProperty } from "../types";
import { refSubMeta } from "./RefSubMeta";
import { createPrimitiveUrl, createRefType } from "../utils";
import { refPersonLink } from "../RelationLinks/RefPersonLink";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";
import DataSceneCompatibility from "@ref/Data/Compatibility/DataScene";

export const refMember: RefProperty = {
    //field: "member",
    ontologyProperty: "avnu:member",
    url: "/member",
    label: "Membre d'équipe",
    cardinality: "0..1",
    description: "Identifiant d'un membre d'équipe et le libellé de son rôle dans l'équipe.",
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
    ref: [
        {
            ...refPersonLink,
            field: "member",
            label: "Membre de l'équipe",
            cardinality: "1..1",
            description: "",
            compatibility: [],
            //note: "",
        },
        {
            field: "role",
            type: createRefType("string"),
            ontologyProperty: "avnu:role",
            url: createPrimitiveUrl("role"),
            label: "",
            cardinality: "0..1",
            description: "",
            compatibility: [],
            //note: "",
        },
        { ...refSubMeta },
    ],
};

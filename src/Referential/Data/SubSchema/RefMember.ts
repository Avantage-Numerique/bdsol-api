import { RefProperty } from "@ref/Data/types";
import { createPrimitiveUrl, createRefType } from "@ref/Data/utils";
import { refPersonLink } from "@ref/Data/RelationLinks/RefPersonLink";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";
import DataSceneCompatibility from "@ref/Data/Compatibility/DataScene";
import { refPerson } from "@ref/Data/Entities/RefPerson";
import { refOrder } from "@ref/Data/Properties/RefOrder";

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
            description: refPerson.description,
            compatibility: refPerson.compatibility,
            //note: "",
        },
        {
            field: "role",
            type: createRefType("string"),
            ontologyProperty: "avnu:role",
            url: createPrimitiveUrl("role"),
            label: "Role",
            cardinality: "0..1",
            description: "Role assigné à ce membre.",
            compatibility: [SchemaOrgCompatibility.getOntologyCompatibilityArray("roleName")],
            //note: "",
        },
        { ...refOrder },
    ],
};

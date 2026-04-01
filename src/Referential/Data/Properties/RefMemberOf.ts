import { RefProperty } from "../types";
import { createPrimitiveUrl, createRefType } from "../utils";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";

export const refMemberOf: RefProperty = {
    field: "memberOf",
    ontologyProperty: "avnu:organizations",
    url: createPrimitiveUrl("memberOf"),
    label: "Membre de/des organisation(s)",
    type: createRefType("reference", [EntityTypesEnum.organisation]),
    cardinality: "0..N",
    compatibility: [
        SchemaOrgCompatibility.getOntologyCompatibilityArray("memberOf"),
        //ArtsdataCompatibility.getOntologyCompatibilityArray("memberOf"),
        //DataSceneCompatibility.getOntologyCompatibilityArray("memberOf", "memberOf (type:Organization)"),
    ],
    description: "Liste des organisations auxquels l'entités fait partie.",
};

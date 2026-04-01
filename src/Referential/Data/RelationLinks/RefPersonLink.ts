import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefProperty } from "../types";
import { createRefType } from "../utils";

export const refPersonLink: RefProperty = {
    ontologyProperty: "avnu:person",
    url: "/member", //member//relationLinks.personLink
    label: "Référence à une personne",
    type: createRefType("reference", [EntityTypesEnum.person]),
    cardinality: "0..N",
    compatibility: [],
    description: "Référence à une entité personne.",
};

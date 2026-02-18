import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefProperty } from "../types";
import { createRefType } from "../utils";

export const refOrganisationLink: RefProperty = {
    //field: "entityInCharge",
    //field: "producer",
    ontologyProperty: "avnu:relationLinks.organisationLink",
    url: "/organisationLink",
    label: "Organisations associées",
    type: createRefType("reference", [EntityTypesEnum.organisation]),
    cardinality: "0..N",
    compatibility: [],
    description: "Référence à une entité Place, qui décrit un lieu.",
};

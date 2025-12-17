import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefPropertyRelationLink } from "../types";

export const refOrganisationLink: RefPropertyRelationLink = {
    //field: "entityInCharge",
    //field: "producer",
    ontologyProperty: "avnu:relationLinks.organisationLink",
    url: "/organisationLink",
    label: "Organisations associées",
    type: "id",
    entityRef: [EntityTypesEnum.organisation],
    cardinality: "0..N",
    compatibility: [],
    description: "Référence à une entité Place, qui décrit un lieu.",
};

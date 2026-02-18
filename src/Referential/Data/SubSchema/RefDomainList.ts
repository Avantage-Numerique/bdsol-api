import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefProperty } from "../types";
import { refSubMeta } from "./RefSubMeta";
import { createRefType } from "../utils";

export const refDomainList: RefProperty = {
    field: "domains",
    label: "Domaine d'activité",
    ontologyProperty: "avnu:domainList",
    url: "/domainList",
    cardinality: "0..N",
    description: "Taxonomie de catégorie 'domain'.",

    type: createRefType("object"),
    ref: [
        {
            field: "domain",
            label: "Domaine",
            cardinality: "0..1",
            type: createRefType("reference", [EntityTypesEnum.taxonomy]),
            description: "Référence à une taxonomie de type 'domain'",
        },
        { ...refSubMeta },
    ],
};

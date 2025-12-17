import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefEntityOrSchema } from "../types";
import { refSubMeta } from "./RefSubMeta";

export const refDomainList: RefEntityOrSchema = {
    field: "domains",
    label: "Domaine d'activité",
    ontologyProperty: "avnu:domainList",
    url: "/domainList",
    cardinality: "0..N",
    description: "Taxonomie de catégorie 'domain'.",
    ref: [
        {
            field: "domain",
            label: "Domaine",
            cardinality: "0..1",
            type: "id",
            entityRef: [EntityTypesEnum.taxonomy],
            description: "Référence à une taxonomie de type 'domain'",
        },
        { ...refSubMeta },
    ],
};

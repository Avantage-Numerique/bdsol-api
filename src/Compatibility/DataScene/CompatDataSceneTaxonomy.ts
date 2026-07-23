import { CompatibilityOntology } from "../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBTaxonomyToDataScene: CompatibilityOntology = {
    [EntityTypesEnum.taxonomy]: {
        name: {
            fields: ["name"],
            source: (doc) => doc.name,
        },
        description: {
            fields: ["description"],
            source: (doc) => doc.description,
        },
    },
};

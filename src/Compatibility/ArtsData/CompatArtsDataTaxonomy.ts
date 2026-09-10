import { CompatibilityOntology } from "../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBTaxonomyToArtsData: CompatibilityOntology = {
    [EntityTypesEnum.taxonomy]: {
        compatibility: {
            name: {
                fields: ["name"],
                source: (doc) => doc.name,
            },
            description: {
                fields: ["description"],
                source: (doc) => doc.description,
            },
        },
    },
};

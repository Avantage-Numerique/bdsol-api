import { CompatibilityOntology } from "../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBEquipmentToArtsData: CompatibilityOntology = {
    [EntityTypesEnum.equipment]: {
        compatibility: {
            description: {
                fields: ["description"],
                source: (doc) => doc.description,
            },
            abstract: {
                fields: ["shortDescription"],
                source: (doc) => doc.shortDescription,
            },
            /* image: {
            fields: ["mainImage"],
            source: (doc) => doc.mainImage,
        }, */
        },
    },
};

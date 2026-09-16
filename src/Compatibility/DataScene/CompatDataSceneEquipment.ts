import { CompatibilityOntology } from "../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBEquipmentToDataScene: CompatibilityOntology = {
    [EntityTypesEnum.equipment]: {
        "@type": "",
        description: "",
        external: "",
        compatibility: {
            description: {
                fields: ["description"],
                source: (doc) => doc.description,
            },
            shortDescription: {
                fields: ["shortDescription"],
                source: (doc) => doc.shortDescription,
            },
            /* media: {
                fields: ["mainImage"],
                source: (doc) => doc.mainImage,
            }, */
        },
    },
};

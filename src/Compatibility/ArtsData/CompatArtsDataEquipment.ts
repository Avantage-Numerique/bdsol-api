import { CompatibilityOntology } from "../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBEquipmentToArtsData: CompatibilityOntology = {
    [EntityTypesEnum.equipment]: {
        "@type": "",
        description: "",
        external: "",
        compatibility: {
            description: {
                fields: ["description"],
                export: (doc) => doc.description,
            },
            abstract: {
                fields: ["shortDescription"],
                export: (doc) => doc.shortDescription,
            },
            /* image: {
            fields: ["mainImage"],
            export: (doc) => doc.mainImage,
        }, */
        },
    },
};

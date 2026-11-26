import { CompatibilityOntology } from "../../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

//No type compatibility
export const compatibilityDBEquipmentToDataScene: CompatibilityOntology = {
    [EntityTypesEnum.equipment]: {
        "@type": "",
        description: "",
        external: "",
        compatibility: {
            description: {
                fields: ["description"],
                export: (doc) => doc.description,
            },
            shortDescription: {
                fields: ["shortDescription"],
                export: (doc) => doc.shortDescription,
            },
            /* media: {
                fields: ["mainImage"],
                export: (doc) => doc.mainImage,
            }, */
        },
    },
};

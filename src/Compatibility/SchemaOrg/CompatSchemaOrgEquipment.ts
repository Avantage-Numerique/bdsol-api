import { CompatibilityOntology } from "../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBEquipmentToSchemaOrg: CompatibilityOntology = {
    [EntityTypesEnum.equipment]: {
        name: {
            fields: ["name"],
            source: (doc) => doc.name,
        },
        /* "category": {
            fields: ["equipmentType"],
            source: (doc) => doc.equipmentType,
        }, */
        alternateName: {
            fields: ["label"],
            source: (doc) => doc.label,
        },
        description: {
            fields: ["description"],
            source: (doc) => doc.description,
        },
        abstract: {
            fields: ["shortDescription"],
            source: (doc) => doc.shortDescription,
        },
        brand: {
            fields: ["brand"],
            source: (doc) => doc.brand,
        },
        model: {
            fields: ["modelName"],
            source: (doc) => doc.modelName,
        },
        //mediaObject ??
    },
};

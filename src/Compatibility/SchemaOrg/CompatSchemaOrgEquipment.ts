import { CompatibilityOntology } from "../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBEquipmentToSchemaOrg: CompatibilityOntology = {
    [EntityTypesEnum.equipment]: {
        "schema:name": {
            fields: ["name"],
            source: (doc) => doc.name,
        },
        /* "schema:category": {
            fields: ["equipmentType"],
            source: (doc) => doc.equipmentType,
        }, */
        "schema:alternateName": {
            fields: ["label"],
            source: (doc) => doc.label,
        },
        "schema:description": {
            fields: ["description"],
            source: (doc) => doc.description,
        },
        "schema:abstract": {
            fields: ["shortDescription"],
            source: (doc) => doc.shortDescription,
        },
        "schema:brand": {
            fields: ["brand"],
            source: (doc) => doc.brand,
        },
        "schema:model": {
            fields: ["modelName"],
            source: (doc) => doc.modelName,
        },
        //schema:mediaObject ??
    },
};

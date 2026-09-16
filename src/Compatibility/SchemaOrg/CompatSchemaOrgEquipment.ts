import { refEquipment } from "@src/Referential/Data/Entities/RefEquipment";
import { CompatibilityOntology } from "../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBEquipmentToSchemaOrg: CompatibilityOntology = {
    [EntityTypesEnum.equipment]: {
        "@type": "Product",
        description:
            "Tout produit ou service proposé. Par exemple : une paire de chaussures, un billet de concert, la location d'une voiture, une coupe de cheveux ou un épisode d'une série télévisée diffusé en ligne.",
        external: "https://schema.org/Product",
        compatibility: {
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
    },
};

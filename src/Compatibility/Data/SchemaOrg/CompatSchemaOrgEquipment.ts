import { CompatibilityOntology } from "@src/Compatibility/types";
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
                export: (doc) => doc.name,
            },
            /* "category": {
            fields: ["equipmentType"],
            export: (doc) => doc.equipmentType,
        }, */
            alternateName: {
                fields: ["label"],
                export: (doc) => doc.label,
            },
            description: {
                fields: ["description"],
                export: (doc) => doc.description,
            },
            abstract: {
                fields: ["shortDescription"],
                export: (doc) => doc.shortDescription,
            },
            brand: {
                fields: ["brand"],
                export: (doc) => doc.brand,
            },
            model: {
                fields: ["modelName"],
                export: (doc) => doc.modelName,
            },
            //mediaObject ??
        },
    },
};

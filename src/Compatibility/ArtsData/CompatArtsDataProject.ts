import { CompatibilityOntology } from "../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBProjectToArtsData: CompatibilityOntology = {
    [EntityTypesEnum.project]: {
        "@type": "",
        description: "",
        external: "",
        compatibility: {
            name: {
                fields: ["name"],
                export: (doc) => doc.name,
            },
            description: {
                fields: ["description"],
                export: (doc) => doc.description,
            },
            disambiguatingDescription: {
                fields: ["shortDescription"],
                export: (doc) => doc.shortDescription,
            },
            /* creator: {
            fields: ["entityInCharge"],
            export: (doc) => doc.entityInCharge,
        }, */
            /* producer: {
            fields: ["producer"],
            export: (doc) => doc.producer,
        }, */
            /* "location": {
            fields: ["location"],
            export: (doc) => doc.map(), //map les locations
        }, */
            /* image: {
            fields: ["mainImage"],
            export: (doc) => doc.mainImage,
        }, */
        },
    },
};

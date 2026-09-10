import { CompatibilityOntology } from "../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBProjectToArtsData: CompatibilityOntology = {
    [EntityTypesEnum.project]: {
        compatibility: {
            name: {
                fields: ["name"],
                source: (doc) => doc.name,
            },
            description: {
                fields: ["description"],
                source: (doc) => doc.description,
            },
            disambiguatingDescription: {
                fields: ["shortDescription"],
                source: (doc) => doc.shortDescription,
            },
            /* creator: {
            fields: ["entityInCharge"],
            source: (doc) => doc.entityInCharge,
        }, */
            /* producer: {
            fields: ["producer"],
            source: (doc) => doc.producer,
        }, */
            /* "location": {
            fields: ["location"],
            source: (doc) => doc.map(), //map les locations
        }, */
            /* image: {
            fields: ["mainImage"],
            source: (doc) => doc.mainImage,
        }, */
        },
    },
};

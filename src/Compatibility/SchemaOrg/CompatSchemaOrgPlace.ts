import { CompatibilityOntology } from "../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBPlaceToSchemaOrg: CompatibilityOntology = {
    [EntityTypesEnum.place]: {
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
            streetAddress: {
                fields: ["address"],
                source: (doc) => doc.address,
            },
            addressLocality: {
                fields: ["city"],
                source: (doc) => doc.city,
            },
            addressRegion: {
                fields: ["region"],
                source: (doc) => doc.region,
            },
            AdministrativeArea: {
                fields: ["mrc"],
                source: (doc) => doc.mrc,
            },
            //Cannot have 2 property with same key
            /* "addressRegion": {
            fields: ["province"],
            source: (doc) => doc.province,
        }, */
            postalCode: {
                fields: ["postalCode"],
                source: (doc) => doc.postalCode,
            },
            addressCountry: {
                fields: ["country"],
                source: (doc) => doc.country,
            },
            latitude: {
                fields: ["latitude"],
                source: (doc) => doc.latitude,
            },
            longitude: {
                fields: ["longitude"],
                source: (doc) => doc.longitude,
            },
            //MediaObject?
        },
    },
};

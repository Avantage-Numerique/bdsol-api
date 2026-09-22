import { CompatibilityOntology } from "../../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBPlaceToSchemaOrg: CompatibilityOntology = {
    [EntityTypesEnum.place]: {
        "@type": "PostalAddress",
        description: "L'adresse postale",
        external: "https://schema.org/PostalAddress",
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
            streetAddress: {
                fields: ["address"],
                export: (doc) => doc.address,
            },
            addressLocality: {
                fields: ["city"],
                export: (doc) => doc.city,
            },
            addressRegion: {
                fields: ["region"],
                export: (doc) => doc.region,
            },
            AdministrativeArea: {
                fields: ["mrc"],
                export: (doc) => doc.mrc,
            },
            //Cannot have 2 property with same key
            /* "addressRegion": {
            fields: ["province"],
            export: (doc) => doc.province,
        }, */
            postalCode: {
                fields: ["postalCode"],
                export: (doc) => doc.postalCode,
            },
            addressCountry: {
                fields: ["country"],
                export: (doc) => doc.country,
            },
            latitude: {
                fields: ["latitude"],
                export: (doc) => doc.latitude,
            },
            longitude: {
                fields: ["longitude"],
                export: (doc) => doc.longitude,
            },
            //MediaObject?
        },
    },
};

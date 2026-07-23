import { CompatibilityOntology } from "../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBPlaceToSchemaOrg: CompatibilityOntology = {
    [EntityTypesEnum.place]: {
        "schema:name": {
            fields: ["name"],
            source: (doc) => doc.name,
        },
        "schema:description": {
            fields: ["description"],
            source: (doc) => doc.description,
        },
        "schema:disambiguatingDescription": {
            fields: ["shortDescription"],
            source: (doc) => doc.shortDescription,
        },
        "schema:streetAddress": {
            fields: ["address"],
            source: (doc) => doc.address,
        },
        "schema:addressLocality": {
            fields: ["city"],
            source: (doc) => doc.city,
        },
        "schema:addressRegion": {
            fields: ["region"],
            source: (doc) => doc.region,
        },
        "schema:AdministrativeArea": {
            fields: ["mrc"],
            source: (doc) => doc.mrc,
        },
        //Cannot have 2 property with same key
        /* "schema:addressRegion": {
            fields: ["province"],
            source: (doc) => doc.province,
        }, */
        "schema:postalCode": {
            fields: ["postalCode"],
            source: (doc) => doc.postalCode,
        },
        "schema:addressCountry": {
            fields: ["country"],
            source: (doc) => doc.country,
        },
        "schema:latitude": {
            fields: ["latitude"],
            source: (doc) => doc.latitude,
        },
        "schema:longitude": {
            fields: ["longitude"],
            source: (doc) => doc.longitude,
        },
        //schema:MediaObject?
    },
};

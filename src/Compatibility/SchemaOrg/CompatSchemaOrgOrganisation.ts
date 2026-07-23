import { CompatibilityOntology } from "../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBOrganisationToSchemaOrg: CompatibilityOntology = {
    [EntityTypesEnum.organisation]: {
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
        "schema:foundingDate": {
            fields: ["fondationDate"],
            source: (doc) => doc.fondationDate,
        },
        "schema:slogan": {
            fields: ["catchphrase"],
            source: (doc) => doc.catchphrase,
        },
        /* "schema:contactPoint": {
            fields: ["contactPoint"],
            source: (doc) => doc.contactPoint,
        }, */
        "schema:email": {
            fields: ["email"],
            source: (doc) => doc.contactPoint.email,
        },
        "schema:telephone": {
            fields: ["tel"],
            source: (doc) => doc.contactPoint.tel,
        },
        "schema:url": {
            fields: ["website"],
            source: (doc) => doc.contactPoint.website,
        },
        //id to entity, à voir
        /* "schema:location": {
            fields: ["location"],
            source: (doc) => doc.map(), //map les locations
        }, */
        //id to entity, à voir
        /* "schema:member": {
            fields: ["website"],
            source: (doc) => doc.team.map(),//map member ?
        }, */
        //schema:mediaObject ??
        //id to entity, à voir
        /* "schema:owns": {
            fields: ["equipment"],
            source: (doc) => doc.equipment.map(),//map equipment ?
        }, */
    },
};

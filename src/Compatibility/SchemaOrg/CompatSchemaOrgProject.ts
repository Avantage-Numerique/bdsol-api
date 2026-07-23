import { CompatibilityOntology } from "../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBProjectToSchemaOrg: CompatibilityOntology = {
    [EntityTypesEnum.project]: {
        "schema:name": {
            fields: ["name"],
            source: (doc) => doc.name,
        },
        "schema:alternateName": {
            fields: ["alternateName"],
            source: (doc) => doc.alternateName,
        },
        "schema:description": {
            fields: ["description"],
            source: (doc) => doc.description,
        },
        "schema:disambiguatingDescription": {
            fields: ["shortDescription"],
            source: (doc) => doc.shortDescription,
        },
        /* "schema:creator": {
            fields: ["entityInCharge"],
            source: (doc) => doc.entityInCharge,
        }, */
        /* "schema:producer": {
            fields: ["producer"],
            source: (doc) => doc.producer,
        }, */
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
        /* "schema:location": {
            fields: ["location"],
            source: (doc) => doc.map(), //map les locations
        }, */
        /* "schema:member": {
            fields: ["team"],
            source: (doc) => doc.team.map(),//Map members?
        }, */
        /* "schema:sponsor": {
            fields: ["sponsor"],
            source: (doc) => doc.sponsor.map(),//Map sponsor?
        }, */
        /* "schema:keywords": {
            fields: ["skills"],
            source: (doc) => doc.skills.map(),//Map skills name?
        }, */
        /* "schema:owns": {
            fields: ["equipment"],
            source: (doc) => doc.equipment.map(),//Map equipment?
        }, */
        //DateTime pour ScheduleBudget?
        //schema:mediaObject ??
    },
};

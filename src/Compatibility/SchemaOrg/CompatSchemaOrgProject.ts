import { CompatibilityOntology } from "../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBProjectToSchemaOrg: CompatibilityOntology = {
    [EntityTypesEnum.project]: {
        name: {
            fields: ["name"],
            source: (doc) => doc.name,
        },
        alternateName: {
            fields: ["alternateName"],
            source: (doc) => doc.alternateName,
        },
        description: {
            fields: ["description"],
            source: (doc) => doc.description,
        },
        disambiguatingDescription: {
            fields: ["shortDescription"],
            source: (doc) => doc.shortDescription,
        },
        /* "creator": {
            fields: ["entityInCharge"],
            source: (doc) => doc.entityInCharge,
        }, */
        /* "producer": {
            fields: ["producer"],
            source: (doc) => doc.producer,
        }, */
        /* "contactPoint": {
            fields: ["contactPoint"],
            source: (doc) => doc.contactPoint,
        }, */
        email: {
            fields: ["email"],
            source: (doc) => doc.contactPoint.email,
        },
        telephone: {
            fields: ["tel"],
            source: (doc) => doc.contactPoint.tel,
        },
        url: {
            fields: ["website"],
            source: (doc) => doc.contactPoint.website,
        },
        /* "location": {
            fields: ["location"],
            source: (doc) => doc.map(), //map les locations
        }, */
        /* "member": {
            fields: ["team"],
            source: (doc) => doc.team.map(),//Map members?
        }, */
        /* "sponsor": {
            fields: ["sponsor"],
            source: (doc) => doc.sponsor.map(),//Map sponsor?
        }, */
        /* "keywords": {
            fields: ["skills"],
            source: (doc) => doc.skills.map(),//Map skills name?
        }, */
        /* "owns": {
            fields: ["equipment"],
            source: (doc) => doc.equipment.map(),//Map equipment?
        }, */
        //DateTime pour ScheduleBudget?
        //mediaObject ??
    },
};

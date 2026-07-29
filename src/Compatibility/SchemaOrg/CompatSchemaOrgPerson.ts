import { CompatibilityOntology } from "../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBPersonToSchemaOrg: CompatibilityOntology = {
    [EntityTypesEnum.person]: {
        "schema:givenName": {
            fields: ["firstName"],
            source: (doc) => doc.firstName,
        },
        "schema:familyName": {
            fields: ["lastName"],
            source: (doc) => doc.lastName,
        },
        "schema:nickname": {
            fields: ["nickname"],
            source: (doc) => doc.nickname,
        },
        "schema:description": {
            fields: ["description"],
            source: (doc) => doc.description,
        },
        "schema:disambiguatingDescription": {
            fields: ["shortDescription"],
            source: (doc) => doc.shortDescription,
        },
        "schema:additionalName": {
            fields: ["catchphrase"],
            source: (doc) => doc.catchphrase,
        },
        /* "schema:contactPoint": {
            fields: ["contactPoint"],
            source: (doc) => doc.contactPoint,
        }, */
        "schema:email": {
            fields: ["email"],
            source: (doc) => doc.contactPoint.email.address,
        },
        "schema:telephone": {
            fields: ["tel"],
            source: (doc) => doc.contactPoint.tel,
        },
        "schema:url": {
            fields: ["website"],
            source: (doc) => doc.contactPoint.website,
        },
        //schema:mediaObject ??
    },
};

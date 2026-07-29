import { CompatibilityOntology } from "../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBOrganisationToSchemaOrg: CompatibilityOntology = {
    [EntityTypesEnum.organisation]: {
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
        foundingDate: {
            fields: ["fondationDate"],
            source: (doc) => doc.fondationDate,
        },
        slogan: {
            fields: ["catchphrase"],
            source: (doc) => doc.catchphrase,
        },
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
        //id to entity, à voir
        /* "location": {
            fields: ["location"],
            source: (doc) => doc.map(), //map les locations
        }, */
        //id to entity, à voir
        /* "member": {
            fields: ["website"],
            source: (doc) => doc.team.map(),//map member ?
        }, */
        //mediaObject ??
        //id to entity, à voir
        /* "owns": {
            fields: ["equipment"],
            source: (doc) => doc.equipment.map(),//map equipment ?
        }, */
    },
};

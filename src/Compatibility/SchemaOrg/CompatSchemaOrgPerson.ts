import { CompatibilityOntology } from "../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBPersonToSchemaOrg: CompatibilityOntology = {
    [EntityTypesEnum.person]: {
        "@type": "Person",
        description: "Une personne (vivante, morte, morte-vivante ou fictive).",
        external: "https://schema.org/Person",
        compatibility: {
            givenName: {
                fields: ["firstName"],
                export: (doc) => doc.firstName,
            },
            familyName: {
                fields: ["lastName"],
                export: (doc) => doc.lastName,
            },
            nickname: {
                fields: ["nickname"],
                export: (doc) => doc.nickname,
            },
            description: {
                fields: ["description"],
                export: (doc) => doc.description,
            },
            disambiguatingDescription: {
                fields: ["shortDescription"],
                export: (doc) => doc.shortDescription,
            },
            additionalName: {
                fields: ["catchphrase"],
                export: (doc) => doc.catchphrase,
            },
            /* contactPoint: {
                fields: ["contactPoint"],
                export: (doc) => doc.contactPoint,
            }, */
            email: {
                fields: ["contactPoint.email.address"],
                export: (doc) => doc.contactPoint.email.address,
            },
            telephone: {
                fields: ["contactPoint.tel"],
                export: (doc) => doc.contactPoint.tel,
            },
            url: {
                fields: ["contactPoint.website"],
                export: (doc) => doc.contactPoint.website,
            },
            //schema:mediaObject ??
        },
    },
};

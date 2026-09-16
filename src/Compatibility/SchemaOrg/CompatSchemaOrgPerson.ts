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
                source: (doc) => doc.firstName,
            },
            familyName: {
                fields: ["lastName"],
                source: (doc) => doc.lastName,
            },
            nickname: {
                fields: ["nickname"],
                source: (doc) => doc.nickname,
            },
            description: {
                fields: ["description"],
                source: (doc) => doc.description,
            },
            disambiguatingDescription: {
                fields: ["shortDescription"],
                source: (doc) => doc.shortDescription,
            },
            additionalName: {
                fields: ["catchphrase"],
                source: (doc) => doc.catchphrase,
            },
            /* contactPoint: {
                fields: ["contactPoint"],
                source: (doc) => doc.contactPoint,
            }, */
            email: {
                fields: ["contactPoint.email.address"],
                source: (doc) => doc.contactPoint.email.address,
            },
            telephone: {
                fields: ["contactPoint.tel"],
                source: (doc) => doc.contactPoint.tel,
            },
            url: {
                fields: ["contactPoint.website"],
                source: (doc) => doc.contactPoint.website,
            },
            //schema:mediaObject ??
        },
    },
};

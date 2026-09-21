import { CompatibilityOntology } from "../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBProjectToSchemaOrg: CompatibilityOntology = {
    [EntityTypesEnum.project]: {
        "@type": "Project",
        description:
            "Une entreprise (potentiellement individuelle, mais généralement collaborative), planifiée dans le but d'atteindre un objectif précis.",
        external: "https://schema.org/Project",
        compatibility: {
            name: {
                fields: ["name"],
                export: (doc) => doc.name,
            },
            alternateName: {
                fields: ["alternateName"],
                export: (doc) => doc.alternateName,
            },
            description: {
                fields: ["description"],
                export: (doc) => doc.description,
            },
            disambiguatingDescription: {
                fields: ["shortDescription"],
                export: (doc) => doc.shortDescription,
            },
            /* "creator": {
            fields: ["entityInCharge"],
            export: (doc) => doc.entityInCharge,
        }, */
            producer: {
                fields: ["producer"],
                export: (doc) => doc.producer,
            },
            /* "contactPoint": {
            fields: ["contactPoint"],
            export: (doc) => doc.contactPoint,
        }, */
            email: {
                fields: ["email"],
                export: (doc) => doc.contactPoint.email,
            },
            telephone: {
                fields: ["tel"],
                export: (doc) => doc.contactPoint.tel,
            },
            url: {
                fields: ["website"],
                export: (doc) => doc.contactPoint.website,
            },
            /* "location": {
            fields: ["location"],
            export: (doc) => doc.map(), //map les locations
        }, */
            /* "member": {
            fields: ["team"],
            export: (doc) => doc.team.map(),//Map members?
        }, */
            /* "sponsor": {
            fields: ["sponsor"],
            export: (doc) => doc.sponsor.map(),//Map sponsor?
        }, */
            /* "keywords": {
            fields: ["skills"],
            export: (doc) => doc.skills.map(),//Map skills name?
        }, */
            /* "owns": {
            fields: ["equipment"],
            export: (doc) => doc.equipment.map(),//Map equipment?
        }, */
            //DateTime pour ScheduleBudget?
            //mediaObject ??
        },
    },
};

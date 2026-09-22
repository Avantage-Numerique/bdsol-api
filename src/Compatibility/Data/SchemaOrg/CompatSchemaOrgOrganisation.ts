import { CompatibilityOntology } from "../../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBOrganisationToSchemaOrg: CompatibilityOntology = {
    [EntityTypesEnum.organisation]: {
        "@type": "Organization",
        description: "Une organisation tel une école, une ONG, une entreprise, un club, etc.",
        external: "https://schema.org/Organization",
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
            foundingDate: {
                fields: ["fondationDate"],
                export: (doc) => doc.fondationDate,
            },
            slogan: {
                fields: ["catchphrase"],
                export: (doc) => doc.catchphrase,
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
            //id to entity, à voir
            /* "location": {
            fields: ["location"],
            export: (doc) => doc.map(), //map les locations
        }, */
            //id to entity, à voir
            /* "member": {
            fields: ["website"],
            export: (doc) => doc.team.map(),//map member ?
        }, */
            //mediaObject ??
            //id to entity, à voir
            /* "owns": {
            fields: ["equipment"],
            export: (doc) => doc.equipment.map(),//map equipment ?
        }, */
        },
    },
};

import { CompatibilityOntology } from "../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBProjectToDataScene: CompatibilityOntology = {
    [EntityTypesEnum.project]: {
        "@type": "",
        description: "",
        external: "",
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
            shortDescription: {
                fields: ["shortDescription"],
                export: (doc) => doc.shortDescription,
            },
            /* hasMembers: {
            fields: ["shortDescription"],
            export: (doc) => doc.team.map(), //map member?
        }, */
            /* media: {
            fields: ["mainImage"],
            export: (doc) => doc.mainImage,
        }, */
        },
    },
};

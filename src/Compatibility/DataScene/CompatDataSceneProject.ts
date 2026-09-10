import { CompatibilityOntology } from "../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBProjectToDataScene: CompatibilityOntology = {
    [EntityTypesEnum.project]: {
        compatibility: {
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
            shortDescription: {
                fields: ["shortDescription"],
                source: (doc) => doc.shortDescription,
            },
            /* hasMembers: {
            fields: ["shortDescription"],
            source: (doc) => doc.team.map(), //map member?
        }, */
            /* media: {
            fields: ["mainImage"],
            source: (doc) => doc.mainImage,
        }, */
        },
    },
};

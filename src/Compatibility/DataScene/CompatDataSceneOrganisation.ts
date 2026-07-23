import { CompatibilityOntology } from "../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBOrganisationToDataScene: CompatibilityOntology = {
    [EntityTypesEnum.organisation]: {
        name: {
            fields: ["name"],
            source: (doc) => doc.name,
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
};

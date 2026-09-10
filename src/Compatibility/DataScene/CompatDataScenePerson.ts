import { CompatibilityOntology } from "../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBPersonToDataScene: CompatibilityOntology = {
    [EntityTypesEnum.person]: {
        compatibility: {
            name: {
                fields: ["firstName", "lastName"],
                source: (doc) => doc.firstName + " " + doc.lastName,
            },
            description: {
                fields: ["description"],
                source: (doc) => doc.description,
            },
            shortDescription: {
                fields: ["shortDescription"],
                source: (doc) => doc.shortDescription,
            },
            /* media: {
            fields: ["mainImage"],
            source: (doc) => doc.mainImage,
        }, */
        },
    },
};

import { CompatibilityOntology } from "../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBPersonToArtsData: CompatibilityOntology = {
    [EntityTypesEnum.person]: {
        name: {
            fields: ["firstName", "lastName"],
            source: (doc) => doc.firstName + " " + doc.lastName,
        },
        alternateName: {
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
        /* image: {
            fields: ["mainImage"],
            source: (doc) => doc.mainImage,
        }, */
    },
};

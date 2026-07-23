import { CompatibilityOntology } from "../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBEventToDataScene: CompatibilityOntology = {
    [EntityTypesEnum.event]: {
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
        //organizer?
        /* hasMembers: {
            fields: ["team"],
            source: (doc) => doc.team.map(),//Map member
        }, */
        startDate: {
            fields: ["startDate"],
            source: (doc) => doc.startDate,
        },
        endDateTime: {
            fields: ["endDate"],
            source: (doc) => doc.endDate,
        },
        /* media: {
            fields: ["mainImage"],
            source: (doc) => doc.mainImage,
        }, */
        //location?
    },
};

import { CompatibilityOntology } from "../../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBEventToDataScene: CompatibilityOntology = {
    [EntityTypesEnum.event]: {
        "@type": "Performance",
        description:
            "Décrit une représentation, qui est un événement unique associé à un lieu, une date et une heure, et qui peut inclure des informations sur les artistes, les œuvres présentées, et d'autres détails pertinents.",
        external: "https://documentation.datascene.ca/references/performance/",
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
            //organizer?
            /* hasMembers: {
            fields: ["team"],
            export: (doc) => doc.team.map(),//Map member
        }, */
            startDate: {
                fields: ["startDate"],
                export: (doc) => doc.startDate,
            },
            endDateTime: {
                fields: ["endDate"],
                export: (doc) => doc.endDate,
            },
            /* media: {
            fields: ["mainImage"],
            export: (doc) => doc.mainImage,
        }, */
            //location?
        },
    },
};

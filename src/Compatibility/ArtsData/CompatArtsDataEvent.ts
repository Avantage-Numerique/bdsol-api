import { CompatibilityOntology } from "../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBEventToArtsData: CompatibilityOntology = {
    [EntityTypesEnum.event]: {
        "@type": "Event",
        description:
            "Dans Artsdata, un événement est défini comme « une activité organisée qui se déroule à un moment et un lieu précis ». La classe adr:Event est considérée comme une classe équivalente à schema:Event.",
        external: "https://docs.artsdata.ca/classes/event.html",
        compatibility: {
            name: {
                fields: ["name"],
                export: (doc) => doc.name,
            },
            description: {
                fields: ["description"],
                export: (doc) => doc.description,
            },
            //organizer?
            /* additionalType: {
            fields: ["eventType"],
            export: (doc) => doc.eventType,
        }, */
            eventAttendanceMode: {
                fields: ["eventFormat"],
                export: (doc) => doc.eventFormat,
            },
            startDate: {
                fields: ["startDate"],
                export: (doc) => doc.startDate,
            },
            endDate: {
                fields: ["endDate"],
                export: (doc) => doc.endDate,
            },
            /* image: {
            fields: ["mainImage"],
            export: (doc) => doc.mainImage,
        }, */
            /* subEvent: {
            fields: ["subEvents"],
            export: (doc) => doc.subEvents.map(),
        }, */
            //location?
        },
    },
};

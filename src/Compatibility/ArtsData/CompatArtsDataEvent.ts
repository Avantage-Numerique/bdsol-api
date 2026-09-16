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
                source: (doc) => doc.name,
            },
            description: {
                fields: ["description"],
                source: (doc) => doc.description,
            },
            //organizer?
            /* additionalType: {
            fields: ["eventType"],
            source: (doc) => doc.eventType,
        }, */
            eventAttendanceMode: {
                fields: ["eventFormat"],
                source: (doc) => doc.eventFormat,
            },
            startDate: {
                fields: ["startDate"],
                source: (doc) => doc.startDate,
            },
            endDate: {
                fields: ["endDate"],
                source: (doc) => doc.endDate,
            },
            /* image: {
            fields: ["mainImage"],
            source: (doc) => doc.mainImage,
        }, */
            /* subEvent: {
            fields: ["subEvents"],
            source: (doc) => doc.subEvents.map(),
        }, */
            //location?
        },
    },
};

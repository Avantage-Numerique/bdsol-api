import { CompatibilityOntology } from "../../types";
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
                description: "Enter a title by which the event is most likely to be searched and recognized.",
            },
            description: {
                fields: ["description"],
                export: (doc) => doc.description,
                description:
                    "Enter a short description of the event. Don’t repeat other facts like date and location. Instead, add that information to the respective properties.",
            },
            eventAttendanceMode: {
                fields: ["eventFormat"],
                export: (doc) => doc.eventFormat,
                description:
                    "Identify the manner in which audiences attend the event, such as online, offline, or mixed. For the complete list, see EventAttendanceModeEnumeration.",
            },
            startDate: {
                fields: ["startDate"],
                export: (doc) => doc.startDate,
                description: "Enter the date and time when the event begins, in ISO 8601 date format.",
            },
            endDate: {
                fields: ["endDate"],
                export: (doc) => doc.endDate,
            },
            duration: {
                fields: [],
                // implémentation naïve, faudrait trouver une formule stable et réutilisable
                // suggestions :
                // https://github.com/MelleB/tinyduration
                // https://www.npmjs.com/package/iso8601-duration
                // native polyfill : https://www.npmjs.com/package/@js-temporal/polyfill
                export: (doc) => doc.endDate - doc.startDate,
                description:
                    "Enter the length from the startDate to the endDate of the event, in ISO 8601 date format.",
            },
            location: {
                fields: [],
                export: (doc) => ({}),
                description:
                    "Enter where the event takes place. In the case of a physical venue, the value should be as precise as possible (for example, the performance hall inside the building instead of the building itself). For disambiguation and reconciliation purposes, it is strongly recommended to assign a sameAs link to the place’s Wikidata or Artsdata URI. ",
            },

            // additionalType
            // url

            // organizer
            // performer
            // workPerformed
            // offers
            // sameAs
            // inLanguage
            // eventAttendanceMode
            // eventStatus
            // alternateName
            // mainEntityOfPage
            // superEvent
            // subEvent

            /* image: {
                fields: ["mainImage"],
                export: (doc) => doc.mainImage,
            }, */
            /* subEvent: {
                fields: ["subEvents"],
                export: (doc) => doc.subEvents.map(),
            }, */
        },
    },
};

import { CompatibilityOntology } from "../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBEventToSchemaOrg: CompatibilityOntology = {
    [EntityTypesEnum.event]: {
        "@type": "Event",
        description:
            "Un événement se déroulant à une heure et dans un lieu précis, comme un concert, une conférence ou un festival. Les événements récurrents peuvent être structurés comme des objets Event distincts.",
        external: "https://schema.org/Event",
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
            disambiguatingDescription: {
                fields: ["shortDescription"],
                export: (doc) => doc.shortDescription,
            },
            /* "funder": {
            fields: ["entityInCharge"],
            export: (doc) => doc.entityInCharge,
        }, */
            //organizer?
            /* "additionalType": {
            fields: ["eventType"],
            export: (doc) => doc.eventType,
        }, */
            eventAttendanceMode: {
                fields: ["eventFormat"],
                export: (doc) => doc.eventFormat,
            },
            /* "member": {
            fields: ["team"],
            export: (doc) => doc.team.map()//map member?,
        }, */
            startDate: {
                fields: ["startDate"],
                export: (doc) => doc.startDate,
            },
            endDate: {
                fields: ["endDate"],
                export: (doc) => doc.endDate,
            },
            /* "contactPoint": {
            fields: ["contactPoint"],
            export: (doc) => doc.contactPoint,
        }, */
            email: {
                fields: ["email"],
                export: (doc) => doc.contactPoint.email,
            },
            telephone: {
                fields: ["tel"],
                export: (doc) => doc.contactPoint.tel,
            },
            url: {
                fields: ["website"],
                export: (doc) => doc.contactPoint.website,
            },
            //mediaObject ??
            /* "attendee": {
            fields: ["attendees"],
            export: (doc) => doc.contactPoint.attendees,
        }, */
            /* "keywords": {
            fields: ["skills"],
            export: (doc) => doc.contactPoint.skills,
        }, */
            /* "subEvent": {
            fields: ["subEvents"],
            export: (doc) => doc.subEvents.map(),
        }, */
            //location?
        },
    },
};

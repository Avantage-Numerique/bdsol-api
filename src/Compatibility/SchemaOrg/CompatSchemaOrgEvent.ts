import { CompatibilityOntology } from "../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBEventToSchemaOrg: CompatibilityOntology = {
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
        disambiguatingDescription: {
            fields: ["shortDescription"],
            source: (doc) => doc.shortDescription,
        },
        /* "funder": {
            fields: ["entityInCharge"],
            source: (doc) => doc.entityInCharge,
        }, */
        //organizer?
        /* "additionalType": {
            fields: ["eventType"],
            source: (doc) => doc.eventType,
        }, */
        eventAttendanceMode: {
            fields: ["eventFormat"],
            source: (doc) => doc.eventFormat,
        },
        /* "member": {
            fields: ["team"],
            source: (doc) => doc.team.map()//map member?,
        }, */
        startDate: {
            fields: ["startDate"],
            source: (doc) => doc.startDate,
        },
        endDate: {
            fields: ["endDate"],
            source: (doc) => doc.endDate,
        },
        /* "contactPoint": {
            fields: ["contactPoint"],
            source: (doc) => doc.contactPoint,
        }, */
        email: {
            fields: ["email"],
            source: (doc) => doc.contactPoint.email,
        },
        telephone: {
            fields: ["tel"],
            source: (doc) => doc.contactPoint.tel,
        },
        url: {
            fields: ["website"],
            source: (doc) => doc.contactPoint.website,
        },
        //mediaObject ??
        /* "attendee": {
            fields: ["attendees"],
            source: (doc) => doc.contactPoint.attendees,
        }, */
        /* "keywords": {
            fields: ["skills"],
            source: (doc) => doc.contactPoint.skills,
        }, */
        /* "subEvent": {
            fields: ["subEvents"],
            source: (doc) => doc.subEvents.map(),
        }, */
        //location?
    },
};

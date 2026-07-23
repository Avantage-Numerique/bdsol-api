import { CompatibilityOntology } from "../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBEventToSchemaOrg: CompatibilityOntology = {
    [EntityTypesEnum.event]: {
        "schema:name": {
            fields: ["name"],
            source: (doc) => doc.name,
        },
        "schema:alternateName": {
            fields: ["alternateName"],
            source: (doc) => doc.alternateName,
        },
        "schema:description": {
            fields: ["description"],
            source: (doc) => doc.description,
        },
        "schema:disambiguatingDescription": {
            fields: ["shortDescription"],
            source: (doc) => doc.shortDescription,
        },
        /* "schema:funder": {
            fields: ["entityInCharge"],
            source: (doc) => doc.entityInCharge,
        }, */
        //organizer?
        /* "schema:additionalType": {
            fields: ["eventType"],
            source: (doc) => doc.eventType,
        }, */
        "schema:eventAttendanceMode": {
            fields: ["eventFormat"],
            source: (doc) => doc.eventFormat,
        },
        /* "schema:member": {
            fields: ["team"],
            source: (doc) => doc.team.map()//map member?,
        }, */
        "schema:startDate": {
            fields: ["startDate"],
            source: (doc) => doc.startDate,
        },
        "schema:endDate": {
            fields: ["endDate"],
            source: (doc) => doc.endDate,
        },
        /* "schema:contactPoint": {
            fields: ["contactPoint"],
            source: (doc) => doc.contactPoint,
        }, */
        "schema:email": {
            fields: ["email"],
            source: (doc) => doc.contactPoint.email,
        },
        "schema:telephone": {
            fields: ["tel"],
            source: (doc) => doc.contactPoint.tel,
        },
        "schema:url": {
            fields: ["website"],
            source: (doc) => doc.contactPoint.website,
        },
        //schema:mediaObject ??
        /* "schema:attendee": {
            fields: ["attendees"],
            source: (doc) => doc.contactPoint.attendees,
        }, */
        /* "schema:keywords": {
            fields: ["skills"],
            source: (doc) => doc.contactPoint.skills,
        }, */
        /* "schema:subEvent": {
            fields: ["subEvents"],
            source: (doc) => doc.subEvents.map(),
        }, */
        //location?
    },
};

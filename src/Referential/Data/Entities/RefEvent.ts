import { EventFormatEnum } from "@src/Events/EventFormatEnum";
import { refAlternateName } from "../Properties/RefAlternateName";
import { refDescription } from "../Properties/RefDescription";
import { refName } from "../Properties/RefName";
import { refType } from "../Properties/RefType";
import { refEventLink } from "../RelationLinks/RefEventLink";
import { refMainImageLink } from "../RelationLinks/RefMainImageLink";
import { refOrganisationLink } from "../RelationLinks/RefOrganisationLink";
import { refPersonLink } from "../RelationLinks/RefPersonLink";
import { refTaxonomyLink } from "../RelationLinks/RefTaxonomyLink";
import { refContactPoint } from "../SubSchema/RefContactPoint";
import { refDomainList } from "../SubSchema/RefDomainList";
import { refSchedule } from "../SubSchema/RefSchedule";
import { refSocialHandle } from "../SubSchema/RefSocialHandle";
import { refTeam } from "../SubSchema/RefTeam";
import { RefProperty } from "../types";
import { createPrimitiveUrl, createRefType } from "../utils";
import { refShortDescription } from "../Properties/RefShortDescription";
import ArtsdataCompatibility from "@ref/Data/Compatibility/Artsdata";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";
import DataSceneCompatibility from "@ref/Data/Compatibility/DataScene";
import { refPlaceLink } from "@ref/Data/RelationLinks/RefPlaceLink";

export const refEvent: RefProperty = {
    ontologyProperty: "avnu:Event",
    url: "/event",
    label: "Événement",
    description: "Décrit un événement, son lieu, son horaire, ses caractéristiques etc.",
    compatibility: [
        ArtsdataCompatibility.getOntologyCompatibilityArray(
            "Event",
            "Event",
            "https://docs.artsdata.ca/classes/event.html"
        ),
        SchemaOrgCompatibility.getOntologyCompatibilityArray("Event"),
        DataSceneCompatibility.getOntologyCompatibilityArray("performance", "Représentation (type:Performance)"),
    ],
    //note:"",

    type: createRefType("object"),
    ref: [
        { ...refType },
        { ...refName },
        { ...refAlternateName },
        { ...refSocialHandle },
        { ...refDescription },
        { ...refShortDescription },
        {
            ...refOrganisationLink,
            url: "/entityInCharge",
            field: "entityInCharge",
            label: "Entité en charge / Créateur·rice",
            cardinality: "0..1",
            compatibility: [SchemaOrgCompatibility.getOntologyCompatibilityArray("funder")],
        },
        {
            ...refOrganisationLink,
            field: "organizer",
            label: "Producteur·rice",
            cardinality: "0..1",
        },
        {
            ...refTaxonomyLink,
            field: "eventType",
            note: "Taxonomie fixe établi par AVNU de catégorie 'eventType'.",
            compatibility: [
                SchemaOrgCompatibility.getOntologyCompatibilityArray("additionalType"),
                ArtsdataCompatibility.getOntologyCompatibilityArray(
                    "additionalType",
                    "additionalType",
                    "https://docs.artsdata.ca/event-types.html"
                ),
            ],
        },
        {
            field: "eventFormat",
            type: createRefType("string"),
            ontologyProperty: "avnu:eventFormat",
            url: createPrimitiveUrl("eventFormat"),
            label: "Format de l'événement",
            cardinality: "0..1",
            description: "L'événement se déroule de quelle façon : 'En ligne', 'Présentiel' etc.", //
            compatibility: [
                SchemaOrgCompatibility.getOntologyCompatibilityArray("eventAttendanceMode"),
                ArtsdataCompatibility.getOntologyCompatibilityArray(
                    "eventAttendanceMode",
                    "eventAttendanceMode",
                    "http://schema.org/eventAttendanceMode"
                ),
            ],
            constraints: {
                enum: EventFormatEnum,
            },
            note: "Parmis EventFormatEnum",
        },
        { ...refTeam },
        {
            field: "startDate",
            type: createRefType("date"),
            ontologyProperty: "avnu:startDate",
            url: createPrimitiveUrl("startDate"),
            label: "Date de début",
            cardinality: "0..1",
            description: "Date et heure de début de l'événement.",
            compatibility: [
                SchemaOrgCompatibility.getOntologyCompatibilityArray("startDate"),
                ArtsdataCompatibility.getOntologyCompatibilityArray(
                    "startDate",
                    "startDate",
                    "http://schema.org/startDate"
                ),
                DataSceneCompatibility.getOntologyCompatibilityArray(
                    "startDateTime",
                    "startDateTime",
                    "https://documentation.datascene.ca/references/performance/#3-propriete-representation-performance-startdatetime-date-et-heure-de-debut"
                ),
            ],
            //note: "",
        },
        {
            field: "endDate",
            type: createRefType("date"),
            ontologyProperty: "avnu:endDate",
            url: createPrimitiveUrl("endDate"),
            label: "Date de fin",
            cardinality: "0..1",
            description: "Date et heure de fin de l'événement.",
            compatibility: [
                SchemaOrgCompatibility.getOntologyCompatibilityArray("endDate"),
                ArtsdataCompatibility.getOntologyCompatibilityArray("endDate", "endDate", "http://schema.org/endDate"),
                DataSceneCompatibility.getOntologyCompatibilityArray(
                    "endDateTime",
                    "endDateTime",
                    "https://documentation.datascene.ca/references/performance/#4-propriete-representation-performance-enddatetime-date-et-heure-de-fin"
                ),
            ],
            note: "Doit être ultérieure à la date de début",
        },
        { ...refContactPoint },
        { ...refMainImageLink },
        {
            ...refPersonLink,
            field: "attendees",
            ontologyProperty: "avnu:attendees",
            url: "/attendee",
            label: "Participants",
            description: "Personnes ayant participé à l'événement.",
            compatibility: [SchemaOrgCompatibility.getOntologyCompatibilityArray("attendee")],
        },
        {
            ...refTaxonomyLink,
            field: "skills",
            compatibility: [SchemaOrgCompatibility.getOntologyCompatibilityArray("keywords")],
            description: "Compétences et technologies associées à l'événement.",
            //keywords
        },
        { ...refDomainList },
        { ...refSchedule },
        { ...refEventLink },
        {
            ...refPlaceLink,
            description: "Les lieux seront mis à jour prochainement vers cette structure.",
        },
        {
            ...refMainImageLink,
            description: "Ce champs est en cours de développement pour devenir un array d'objet média.",
        },

        //Ontologie :
        //Identifiant
        //Short-description
        //Média => pas une liste d'image
        //Project
        //Nom identique au Projet

        //Hors ontologie
        //slug
        //meta
    ],
};

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
import { refLocation } from "../SubSchema/RefLocation";
import { refSchedule } from "../SubSchema/RefSchedule";
import { refSocialHandle } from "../SubSchema/RefSocialHandle";
import { refTeam } from "../SubSchema/RefTeam";
import { RefProperty } from "../types";
import { createPrimitiveUrl, createRefType } from "../utils";
import AvnuCompatibility from "@ref/Data/Compatibility/Avnu";
import ArtsdataCompatibility from "@ref/Data/Compatibility/Artsdata";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";
import DataSceneCompatibility from "@ref/Data/Compatibility/DataScene";

export const refEvent: RefProperty = {
    ontologyProperty: "avnu:event",
    url: "/event",
    label: "Événement",
    description: "Décrit un événement, son lieu, son horaire, ses caractéristiques etc.",
    compatibility: [
        AvnuCompatibility.getOntologyCompatibilityArray("Event"),
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
        {
            ...refOrganisationLink,
            field: "entityInCharge",
            label: "Entité en charge / Créateur·rice",
            cardinality: "0..1",
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
        },
        {
            field: "eventFormat",
            type: createRefType("string"),
            ontologyProperty: "avnu:eventFormat",
            url: createPrimitiveUrl("eventFormat"),
            label: "Format de l'événement",
            cardinality: "0..1",
            description: "L'événement se déroule de quelle façon : 'En ligne', 'Présentiel' etc.",
            compatibility: [],
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
            compatibility: [],
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
            compatibility: [],
            note: "Doit être ultérieure à la date de début",
        },
        { ...refContactPoint },
        { ...refMainImageLink },
        {
            ...refPersonLink,
            field: "attendees",
            label: "Participants",
            description: "Personne déclarant participer à l'événement.",
        },
        {
            ...refTaxonomyLink,
            field: "skills",
        },
        { ...refDomainList },
        { ...refSchedule },
        { ...refEventLink },
        { ...refLocation },
        {
            ...refMainImageLink,
            field: "photoGallery",
            label: "Galerie photo",
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

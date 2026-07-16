import { EventFormatEnum } from "@src/Events/EventFormatEnum";
import { refDescription } from "@ref/Data/Properties/RefDescription";
import { refName } from "@ref/Data/Properties/RefName";
import { refType } from "@ref/Data/Properties/RefType";
import { refEventLinks } from "@ref/Data/RelationLinks/RefEventLink";
import { refMainImageLink } from "@ref/Data/RelationLinks/RefMainImageLink";
import { refOrganisationLink } from "@ref/Data/RelationLinks/RefOrganisationLink";
import { refPersonLinks } from "@ref/Data/RelationLinks/RefPersonLink";
import { refTaxonomyLinks } from "@ref/Data/RelationLinks/RefTaxonomyLink";
import { refContactPoint } from "@ref/Data/SubSchema/RefContactPoint";
import { refDomainList } from "@ref/Data/SubSchema/RefDomainList";
import { refSchedule } from "@ref/Data/SubSchema/RefSchedule";
import { refSocialHandle } from "@ref/Data/SubSchema/RefSocialHandle";
import { refTeam } from "@ref/Data/SubSchema/RefTeam";
import { RefSchema } from "@ref/Data/types";
import { createRefType } from "@ref/Data/utils";
import { refShortDescription } from "@ref/Data/Properties/RefShortDescription";
import { refPlaceLinks } from "@ref/Data/RelationLinks/RefPlaceLink";

export const refEvent: RefSchema = {
    type: createRefType("object"),
    fields: {
        type: refType,
        name: refName,
        alternateName: {
            cardinality: "0..1",
            type: createRefType("string"),
        },
        url: {
            cardinality: "0..N",
            type: createRefType("object"),
            fields: refSocialHandle.fields,
        },
        description: refDescription,
        shortDescription: refShortDescription,
        entityInCharge: refOrganisationLink,
        organizer: refOrganisationLink,
        eventType: refTaxonomyLinks,
        eventFormat: {
            cardinality: "0..1",
            type: createRefType("string"),
            constraints: {
                enum: EventFormatEnum,
            },
        },
        team: {
            cardinality: "0..N",
            type: createRefType("object"),
            fields: refTeam.fields,
        },
        startDate: {
            cardinality: "0..1",
            type: createRefType("date"),
        },
        endDate: {
            cardinality: "0..1",
            type: createRefType("date"),
        },
        contactPoint: {
            cardinality: "0..1",
            type: createRefType("object"),
            fields: refContactPoint.fields,
        },
        mainImage: refMainImageLink,
        attendees: refPersonLinks,
        skills: refTaxonomyLinks,
        domains: {
            cardinality: "0..N",
            type: createRefType("object"),
            fields: refDomainList.fields,
        },
        schedule: {
            cardinality: "0..N",
            type: createRefType("object"),
            fields: refSchedule.fields,
        },
        subEvents: refEventLinks,
        location: refPlaceLinks,
        photoGallery: refMainImageLink,

        //Ontologie :
        //Identifiant
        //Short-description
        //Média => pas une liste d'image
        //Project
        //Nom identique au Projet

        //Hors ontologie
        //slug
        //meta
    },
};

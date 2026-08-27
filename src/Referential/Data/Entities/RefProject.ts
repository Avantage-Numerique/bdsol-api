import { RefSchema } from "@ref/Data/types";
import { refDescription } from "@ref/Data/Properties/RefDescription";
import { refName } from "@ref/Data/Properties/RefName";
import { refType } from "@ref/Data/Properties/RefType";
import { refContactPoint } from "@ref/Data/SubSchema/RefContactPoint";
import { refSocialHandle } from "@ref/Data/SubSchema/RefSocialHandle";
import { refTeam } from "@ref/Data/SubSchema/RefTeam";
import { refDomainList } from "@ref/Data/SubSchema/RefDomainList";
import { refOrganisationLinks } from "@ref/Data/RelationLinks/RefOrganisationLink";
import { refSponsor } from "@ref/Data/SubSchema/RefSponsor";
import { refScheduleBudget } from "@ref/Data/SubSchema/RefScheduleBudget";
import { refPlaceLinks } from "@ref/Data/RelationLinks/RefPlaceLink";
import { refMainImageLink } from "@ref/Data/RelationLinks/RefMainImageLink";
import { refEquipmentLinks } from "@ref/Data/RelationLinks/RefEquipmentLink";
import { refTaxonomyLinks } from "@ref/Data/RelationLinks/RefTaxonomyLink";
import { createRefType } from "@ref/Data/utils";
import { ProjectContextEnum } from "@src/Projects/ProjectContextEnum";
import { refShortDescription } from "@ref/Data/Properties/RefShortDescription";
import { refMeta } from "../SubSchema/RefMeta";

import { refSameAs } from "../Properties/RefSameAs";

export const refProject: RefSchema = {
    type: createRefType("object"),
    fields: {
        type: refType,
        name: refName,
        alternateName: {
            cardinality: "0..1",
            type: createRefType("string"),
        },
        entityInCharge: refOrganisationLinks,
        producer: refOrganisationLinks,
        description: refDescription,
        shortDescription: refShortDescription,
        url: {
            cardinality: "0..N",
            type: createRefType("object"),
            fields: refSocialHandle.fields,
        },
        contactPoint: {
            cardinality: "0..1",
            type: createRefType("object"),
            fields: refContactPoint.fields,
        },
        location: refPlaceLinks,
        team: {
            cardinality: "0..N",
            type: createRefType("object"),
            fields: refTeam.fields,
        },
        mainImage: refMainImageLink,
        sponsor: {
            cardinality: "0..N",
            type: createRefType("object"),
            fields: refSponsor.fields,
        },
        scheduleBudget: {
            cardinality: "0..1",
            type: createRefType("object"),
            fields: refScheduleBudget.fields,
        },
        skills: refTaxonomyLinks,
        domains: {
            cardinality: "0..N",
            type: createRefType("object"),
            fields: refDomainList.fields,
        },
        context: {
            cardinality: "0..1",
            type: createRefType("string"),
            constraints: {
                enum: ProjectContextEnum,
            },
        },

        equipment: refEquipmentLinks,
        
        meta: {
            cardinality: "0..1",
            type: createRefType("object"),
            fields: refMeta.fields,
        },

        { ...refSameAs },

        //Ontologie :
        //Identifiant
        //Short-description
        //Média => pas une liste d'image
        //Événement
        //Langues
        //Sans parole

        //Hors ontologie
        //slug
        //meta
    },
};

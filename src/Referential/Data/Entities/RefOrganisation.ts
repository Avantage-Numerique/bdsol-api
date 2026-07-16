import { refDescription } from "@ref/Data/Properties/RefDescription";
import { refType } from "@ref/Data/Properties/RefType";
import { refContactPoint } from "@ref/Data/SubSchema/RefContactPoint";
import { refDomainList } from "@ref/Data/SubSchema/RefDomainList";
import { refSkillGroup } from "@ref/Data/SubSchema/RefSkillGroup";
import { refSocialHandle } from "@ref/Data/SubSchema/RefSocialHandle";
import { refTeam } from "@ref/Data/SubSchema/RefTeam";
import { RefSchema } from "@ref/Data/types";
import { refName } from "@ref/Data/Properties/RefName";
import { refEquipmentLinkSchema } from "@ref/Data/SubSchema/RefEquipmentLinkSchema";
import { refRegion } from "@ref/Data/Properties/RefRegion";
import { refBadges } from "@ref/Data/Properties/RefBadges";
import { refMainImageLink } from "@ref/Data/RelationLinks/RefMainImageLink";
import { createRefType } from "@ref/Data/utils";
import { refShortDescription } from "@ref/Data/Properties/RefShortDescription";
import { refMeta } from "../SubSchema/RefMeta";
import { refPlaceLinks } from "../RelationLinks/RefPlaceLink";

export const refOrganisation: RefSchema = {
    type: createRefType("object"),
    fields: {
        type: refType,
        name: refName,
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
        fondationDate: {
            cardinality: "0..1",
            type: createRefType("date"),
        },
        offers: {
            cardinality: "0..N",
            type: createRefType("object"),
            fields: refSkillGroup.fields,
        },
        domains: {
            cardinality: "0..N",
            type: createRefType("object"),
            fields: refDomainList.fields,
        },
        team: {
            cardinality: "0..N",
            type: createRefType("object"),
            fields: refTeam.fields,
        },
        mainImage: refMainImageLink,
        catchphrase: {
            cardinality: "0..1",
            type: createRefType("string"),
        },
        location: refPlaceLinks,
        equipment: {
            cardinality: "0..N",
            type: createRefType("object"),
            fields: refEquipmentLinkSchema.fields,
        },
        region: refRegion,
        badges: refBadges,
        meta: {
            cardinality: "0..1",
            type: createRefType("object"),
            fields: refMeta.fields,
        },

        //Ontologie :
        //Projets
        //Identifiants
        //Participant à des événement list[]
        //Alternate name
        //short-description

        //Hors-ontologie :
        //meta
        //slug
    },
};

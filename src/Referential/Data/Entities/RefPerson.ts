import { createRefType } from "@ref/Data/utils";
import { RefSchema } from "@ref/Data/types";
import { refContactPoint } from "@src/Referential/Data/SubSchema/RefContactPoint";
import { refDomainList } from "@src/Referential/Data/SubSchema/RefDomainList";
import { refSkillGroup } from "@src/Referential/Data/SubSchema/RefSkillGroup";
import { refSocialHandle } from "@src/Referential/Data/SubSchema/RefSocialHandle";
import { refDescription } from "../Properties/RefDescription";
import { refShortDescription } from "../Properties/RefShortDescription";
import { refType } from "../Properties/RefType";
import { refMainImageLink } from "../RelationLinks/RefMainImageLink";
import { refMeta } from "../SubSchema/RefMeta";
import { refRegion } from "../Properties/RefRegion";
import { refBadges } from "../Properties/RefBadges";
import { refSameAs } from "../SubSchema/RefSameAs";

export const refPerson: RefSchema = {
    type: createRefType("object"),
    fields: {
        type: refType,
        lastName: {
            cardinality: "1..1",
            type: createRefType("string"),
            constraints: { required: true, minLength: 2 },
        },
        firstName: {
            cardinality: "1..1",
            type: createRefType("string"),
            constraints: { required: true, minLength: 2 },
        },
        nickname: {
            cardinality: "0..1",
            type: createRefType("string"),
        },
        description: refDescription,
        shortDescription: refShortDescription,
        occupations: {
            cardinality: "0..N",
            type: createRefType("object"),
            fields: refSkillGroup.fields,
        },
        domains: {
            cardinality: "0..N",
            type: createRefType("object"),
            fields: refDomainList.fields,
        },
        mainImage: refMainImageLink,
        catchphrase: {
            cardinality: "0..1",
            type: createRefType("string"),
        },
        contactPoint: {
            cardinality: "0..1",
            type: createRefType("object"),
            fields: refContactPoint.fields,
        },
        url: {
            cardinality: "0..N",
            type: createRefType("object"),
            fields: refSocialHandle.fields,
        },
        region: refRegion,
        badges: refBadges,
        sameAs: {
            cardinality: "0..N",
            type: createRefType("object"),
            fields: refSameAs.fields,
        },
        meta: {
            cardinality: "0..1",
            type: createRefType("object"),
            fields: refMeta.fields,
        },
    },
};

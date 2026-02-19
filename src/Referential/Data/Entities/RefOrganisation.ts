import { refCatchphrase } from "../Properties/RefCatchphrase";
import { refDescription } from "../Properties/RefDescription";
import { refType } from "../Properties/RefType";
import { refContactPoint } from "../SubSchema/RefContactPoint";
import { refDomainList } from "../SubSchema/RefDomainList";
import { refSkillGroup } from "../SubSchema/RefSkillGroup";
import { refSocialHandle } from "../SubSchema/RefSocialHandle";
import { refTeam } from "../SubSchema/RefTeam";
import { RefProperty } from "../types";
import { refName } from "../Properties/RefName";
import { refEquipmentLinkSchema } from "../SubSchema/RefEquipmentLinkSchema";
import { refRegion } from "../Properties/RefRegion";
import { refBadges } from "../Properties/RefBadges";
import { refMainImageLink } from "../RelationLinks/RefMainImageLink";
import { refPlaceLink } from "../RelationLinks/RefPlaceLink";
import { createPrimitiveUrl, createRefType } from "../utils";

export const refOrganisation: RefProperty = {
    ontologyProperty: "avnu:organisation",
    url: "/organisation",
    label: "Organisation",
    description: "",
    compatibility: [],
    note: "",

    type: createRefType("object"),
    ref: [
        { ...refType },
        { ...refName },
        { ...refDescription },
        {
            field: "fondationDate",
            type: createRefType("date"),
            ontologyProperty: "avnu:fondationDate",
            url: createPrimitiveUrl("fondationDate"),
            label: "Date de fondation",
            cardinality: "0..1",
            description: "Date où l'entité a été fondé.",
            compatibility: [],
            //note: "",
        },
        { ...refCatchphrase },
        {
            ...refSocialHandle,
        },
        { ...refContactPoint },
        {
            ...refSkillGroup,
            field: "offers",
        },
        { ...refDomainList },
        { ...refTeam },

        { ...refMainImageLink },
        { ...refPlaceLink },
        { ...refEquipmentLinkSchema },
        { ...refRegion },
        { ...refBadges },

        //Ontologie :
        //Projets
        //Identifiants
        //Participant à des événement list[]
        //Alternate name
        //short-description

        //Hors-ontologie :
        //meta
        //slug
    ],
};

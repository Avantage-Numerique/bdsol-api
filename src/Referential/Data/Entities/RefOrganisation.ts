import { refCatchphrase } from "../Properties/RefCatchphrase";
import { refDescription } from "../Properties/RefDescription";
import { refType } from "../Properties/RefType";
import { refContactPoint } from "../SubSchema/RefContactPoint";
import { refDomainList } from "../SubSchema/RefDomainList";
import { refSkillGroup } from "../SubSchema/RefSkillGroup";
import { refSocialHandle } from "../SubSchema/RefSocialHandle";
import { refTeam } from "../SubSchema/RefTeam";
import { RefEntityOrSchema } from "../types";
import { refName } from "../Properties/RefName";
import { refEquipmentLink } from "../SubSchema/RefEquipmentLink";
import { refRegion } from "../Properties/RefRegion";
import { refBadges } from "../Properties/RefBadges";
import { refMainImageLink } from "../RelationLinks/RefMainImageLink";
import { refPlaceLink } from "../RelationLinks/RefPlaceLink";

export const refOrganisation: RefEntityOrSchema = {
    ontologyProperty: "avnu:organisation",
    url: "/organisation",
    label: "Organisation",
    description: "",
    compatibility: [],
    note: "",
    ref: [
        { ...refType },
        { ...refName },
        { ...refDescription },
        {
            field: "fondationDate",
            type: "date",
            //ontologyProperty: "fondationDate",
            //url: "/fondationDate",
            label: "Date de fondation",
            cardinality: "0..1",
            description: "Date où l'entité a été fondé.",
            compatibility: [],
            //note: "",
        },
        { ...refCatchphrase },
        {
            ...refSocialHandle,
            field: "url",
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
        { ...refEquipmentLink },
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

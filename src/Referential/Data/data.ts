import { RefData } from "./types";

//Entities
import { refPerson } from "./Entities/RefPerson";
import { refOrganisation } from "./Entities/RefOrganisation";
import { refProject } from "./Entities/RefProject";
import { refMedia } from "./Entities/RefMedia";

//SubSchema
import { refSkillGroup } from "./SubSchema/RefSkillGroup";
import { refDomainList } from "./SubSchema/RefDomainList";
import { refContactPoint } from "./SubSchema/RefContactPoint";
import { refSocialHandle } from "./SubSchema/RefSocialHandle";
import { refEquipmentLink } from "./SubSchema/RefEquipmentLink";
import { refTimeframe } from "./SubSchema/RefTimeframe";
import { refMember } from "./SubSchema/RefMember";
import { refScheduleBudget } from "./SubSchema/RefScheduleBudget";
import { refSponsor } from "./SubSchema/RefSponsor";
import { refTeam } from "./SubSchema/RefTeam";
import { refSubMeta } from "./SubSchema/RefSubMeta";

//Properties
import { refBadges } from "./Properties/RefBadges";
import { refCatchphrase } from "./Properties/RefCatchphrase";
import { refDescription } from "./Properties/RefDescription";
import { refName } from "./Properties/RefName";
import { refRegion } from "./Properties/RefRegion";
import { refType } from "./Properties/RefType";

//RelationsLinks
import { refEquipmentLinkSimpleArray } from "./RelationLinks/RefEquipmentLinkSimpleArray";
import { refMainImageLink } from "./RelationLinks/RefMainImageLink";
import { refOrganisationLink } from "./RelationLinks/RefOrganisationLink";
import { refPlaceLink } from "./RelationLinks/RefPlaceLink";

export const refData: RefData = {
    entities: {
        [refPerson.label]: refPerson,
        [refOrganisation.label]: refOrganisation,
        [refProject.label]: refProject,
        [refMedia.label]: refMedia,
    },

    subschemas: {
        [refSkillGroup.label]: refSkillGroup,
        [refDomainList.label]: refDomainList,
        [refContactPoint.label]: refContactPoint,
        [refSocialHandle.label]: refSocialHandle,
        [refEquipmentLink.label]: refEquipmentLink,
        [refTimeframe.label]: refTimeframe,
        [refMember.label]: refMember,
        [refScheduleBudget.label]: refScheduleBudget,
        [refSponsor.label]: refSponsor,
        [refTeam.label]: refTeam,
        [refSubMeta.label]: refSubMeta,
    },

    properties: {
        [refBadges.label]: refBadges,
        [refCatchphrase.label]: refCatchphrase,
        [refDescription.label]: refDescription,
        [refName.label]: refName,
        [refRegion.label]: refRegion,
        [refType.label]: refType,
    },

    relationLinks: {
        [refEquipmentLinkSimpleArray.label]: refEquipmentLinkSimpleArray,
        [refMainImageLink.label]: refMainImageLink,
        [refOrganisationLink.label]: refOrganisationLink,
        [refPlaceLink.label]: refPlaceLink,
    },
};

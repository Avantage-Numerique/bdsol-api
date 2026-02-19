import { RefData } from "./types";

//Entities
import { refPerson } from "./Entities/RefPerson";
import { refOrganisation } from "./Entities/RefOrganisation";
import { refTaxonomy } from "./Entities/RefTaxonomy";
import { refProject } from "./Entities/RefProject";
import { refEvent } from "./Entities/RefEvent";
import { refMedia } from "./Entities/RefMedia";
import { refPlace } from "./Entities/RefPlace";
import { refEquipment } from "./Entities/RefEquipment";

//SubSchema
import { refSkillGroup } from "./SubSchema/RefSkillGroup";
import { refDomainList } from "./SubSchema/RefDomainList";
import { refContactPoint } from "./SubSchema/RefContactPoint";
import { refSocialHandle } from "./SubSchema/RefSocialHandle";
import { refEquipmentLinkSchema } from "./SubSchema/RefEquipmentLinkSchema";
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
import { refEquipmentLink } from "./RelationLinks/RefEquipmentLink";
import { refMainImageLink } from "./RelationLinks/RefMainImageLink";
import { refOrganisationLink } from "./RelationLinks/RefOrganisationLink";
import { refPlaceLink } from "./RelationLinks/RefPlaceLink";

export const refData: RefData = {
    entities: {
        [refPerson.label]: refPerson,
        [refOrganisation.label]: refOrganisation,
        [refTaxonomy.label]: refTaxonomy,
        [refProject.label]: refProject,
        [refEvent.label]: refEvent,
        [refMedia.label]: refMedia,
        [refPlace.label]: refPlace,
        [refEquipment.label]: refEquipment,
    },

    subschemas: {
        [refSkillGroup.label]: refSkillGroup,
        [refDomainList.label]: refDomainList,
        [refContactPoint.label]: refContactPoint,
        [refSocialHandle.label]: refSocialHandle,
        [refEquipmentLinkSchema.label]: refEquipmentLinkSchema,
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
        [refEquipmentLink.label]: refEquipmentLink,
        [refMainImageLink.label]: refMainImageLink,
        [refOrganisationLink.label]: refOrganisationLink,
        [refPlaceLink.label]: refPlaceLink,
    },
};

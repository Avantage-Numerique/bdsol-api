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
// import { refCatchphrase } from "./Properties/RefCatchphrase";
import { refDescription } from "./Properties/RefDescription";
import { refName } from "./Properties/RefName";
import { refRegion } from "./Properties/RefRegion";
import { refType } from "./Properties/RefType";

//RelationsLinks
import { refEquipmentLink } from "./RelationLinks/RefEquipmentLink";
import { refMainImageLink } from "./RelationLinks/RefMainImageLink";
import { refOrganisationLink } from "./RelationLinks/RefOrganisationLink";
import { refPlaceLink } from "./RelationLinks/RefPlaceLink";
import { refLocation } from "@ref/Data/SubSchema/RefLocation";

//Vocabularies
import { refAttendanceMode } from "@ref/Data/Vocabularies/RefAttendanceMode";
import { refProjectContext } from "@ref/Data/Vocabularies/RefProjectContext";
import { refRegions } from "@ref/Data/Vocabularies/RefRegions";
import { refTimeFrameEta } from "@ref/Data/Vocabularies/RefTimeframeEta";
import { refBudgetRanges } from "@ref/Data/Vocabularies/RefBudgetRange";
import { refDynamicTaxonomyCategories } from "@ref/Data/Vocabularies/RefDynamicTaxonomyCategories";
import { refEntityTypes } from "@ref/Data/Vocabularies/RefEntityTypes";

export const refData: RefData = {
    entities: {
        Person: refPerson,
        Organisation: refOrganisation,
        Taxonomy: refTaxonomy,
        Project: refProject,
        Event: refEvent,
        Media: refMedia,
        Place: refPlace,
        Equipment: refEquipment,
    },

    subschemas: {
        Location: refLocation,
        SkillGroup: refSkillGroup,
        DomainList: refDomainList,
        ContactPoint: refContactPoint,
        SocialHandle: refSocialHandle,
        EquipmentLinkSchema: refEquipmentLinkSchema,
        Timeframe: refTimeframe,
        Member: refMember,
        ScheduleBudget: refScheduleBudget,
        Sponsor: refSponsor,
        Team: refTeam,
        SubMeta: refSubMeta,
    },

    properties: {
        Badges: refBadges,
        // refCatchphrase: refCatchphrase,
        Description: refDescription,
        Name: refName,
        Region: refRegion,
        Type: refType,
    },

    relationLinks: {
        EquipmentLink: refEquipmentLink,
        MainImageLink: refMainImageLink,
        OrganisationLink: refOrganisationLink,
        PlaceLink: refPlaceLink,
    },

    vocabularies: {
        EntityTypes: refEntityTypes,
        DynamicTaxonomyCategories: refDynamicTaxonomyCategories,
        AttendanceMode: refAttendanceMode,
        ProjectContext: refProjectContext,
        Regions: refRegions,
        TimeFrameEta: refTimeFrameEta,
        BudgetRanges: refBudgetRanges,
    },
};

import { RefData } from "./types";
import { refPerson } from "./Entities/ReferentialPerson";
import { refSkillGroup } from "./SubSchema/ReferentialSkillGroup";
import { refDomainList } from "./SubSchema/ReferentialDomainList";
import { refContactPoint } from "./SubSchema/ReferentialContactPoint";
import { refSocialHandle } from "./SubSchema/ReferentialSocialHandle";
import { refSubMeta } from "./SubSchema/ReferentialSubMeta";

export const refData: RefData = {
    primary: {
        person: refPerson,
    },

    secondary: {
        SkillGroup: refSkillGroup,
        DomainList: refDomainList,
        ContactPoint: refContactPoint,
        SocialHandle: refSocialHandle,
        SubMeta: refSubMeta,
    },
};

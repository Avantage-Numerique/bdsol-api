import { RefData } from "./types";

import { refPerson } from "./Entities/ReferentialPerson";
import { refMedia } from "./Entities/ReferentialMedia";

import { refSkillGroup } from "./SubSchema/ReferentialSkillGroup";
import { refDomainList } from "./SubSchema/ReferentialDomainList";
import { refContactPoint } from "./SubSchema/ReferentialContactPoint";
import { refSocialHandle } from "./SubSchema/ReferentialSocialHandle";
import { refSubMeta } from "./SubSchema/ReferentialSubMeta";

export const refData: RefData = {
    entities: {
        [refPerson.label]: refPerson,
        [refMedia.label]: refMedia,
    },

    subschemas: {
        [refSkillGroup.label]: refSkillGroup,
        [refDomainList.label]: refDomainList,
        [refContactPoint.label]: refContactPoint,
        [refSocialHandle.label]: refSocialHandle,
        [refSubMeta.label]: refSubMeta,
    },
};

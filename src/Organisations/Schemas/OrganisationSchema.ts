import {Document} from "mongoose"
import {Meta} from "../../Moderation/Schemas/MetaSchema";
import Media from "../../Media/Models/Media";
import {Member} from "../../Team/Schemas/MemberSchema";
import {DomainSchema} from "@src/Taxonomy/Schemas/DomainSchema";
import { SkillGroup } from "../../Taxonomy/Schemas/SkillGroupSchema";
import { ObjectId } from "mongodb";
import { EquipmentLink } from "@src/Database/Schemas/EquipmentLinkSchema";
import { SocialHandle } from "@src/Database/Schemas/SocialHandleSchema";
import { ContactPoint } from "@src/Database/Schemas/ContactPointSchema";

export interface OrganisationSchema extends Document {
    name:string;
    slug:string;
    description:string;
    url:[SocialHandle]
    contactPoint:ContactPoint;
    fondationDate:Date;
    offers:[SkillGroup];
    domains:[DomainSchema];
    team: [Member];
    mainImage:Media;
    catchphrase:string;
    location: [ObjectId];
    equipment: [EquipmentLink];
    region: string;
    badges: [string]
    meta: Meta;
}

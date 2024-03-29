import {Document} from "mongoose"
import { Status } from "../../Moderation/Schemas/StatusSchema";
import Media from "../../Media/Models/Media";
import { Member } from "../../Team/Schemas/MemberSchema";
import {DomainSchema} from "../../Taxonomy/Schemas/DomainSchema";
import { SkillGroup } from "../../Taxonomy/Schemas/SkillGroupSchema";

export interface OrganisationSchema extends Document {
    name:string;
    slug:string;
    description:string;
    url:string;
    contactPoint:string;
    fondationDate:Date;
    offers:[SkillGroup];
    domains:[DomainSchema];
    team: [Member];
    mainImage:Media;
    catchphrase:string;
    status: Status;
}

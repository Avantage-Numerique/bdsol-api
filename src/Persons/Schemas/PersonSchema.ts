import {Document} from "mongoose";
import Media from "../../Media/Models/Media";
import {Meta} from "../../Moderation/Schemas/MetaSchema";
import {DomainSchema} from "../../Taxonomy/Schemas/DomainSchema";
import {SkillGroup} from "../../Taxonomy/Schemas/SkillGroupSchema";
import { ContactPoint } from "@src/Database/Schemas/ContactPointSchema";
import { SocialHandle } from "@src/Database/Schemas/SocialHandleSchema";

export interface PersonSchema extends Document {
    lastName:string;
    firstName:string;
    slug:string;
    nickname:string;
    description:string;
    occupations:[SkillGroup];
    domains:[DomainSchema];
    mainImage:Media;//ça fonctionne ça ?
    catchphrase:string;
    contactPoint: ContactPoint;
    url: [SocialHandle];
    meta: Meta;
}
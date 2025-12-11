import { Document } from "mongoose";
import Media from "../../Media/Models/Media";
import { Meta } from "../../Moderation/Schemas/MetaSchema";
import { DomainListSchema } from "../../Taxonomy/Schemas/DomainListSchema";
import { SkillGroup } from "../../Taxonomy/Schemas/SkillGroupSchema";
import { ContactPoint } from "@src/Database/Schemas/ContactPointSchema";
import { SocialHandle } from "@src/Database/Schemas/SocialHandleSchema";

export interface PersonSchema extends Document {
    lastName: string;
    firstName: string;
    slug: string;
    nickname: string;
    description: string;
    occupations: [SkillGroup];
    domains: [DomainListSchema];
    mainImage: Media; //ça fonctionne ça ?
    catchphrase: string;
    contactPoint: ContactPoint;
    url: [SocialHandle];
    region: string;
    badges: [string];
    meta: Meta;
}

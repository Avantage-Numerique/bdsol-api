import { Document } from "mongoose";
import Media from "../../Media/Models/Media";
import { Meta } from "../../Moderation/Schemas/MetaSchema";
import { DomainListSchema } from "../../Taxonomy/Schemas/DomainListSchema";
import { SkillGroup } from "../../Taxonomy/Schemas/SkillGroupSchema";
import { ContactPoint } from "@src/Database/Schemas/ContactPointSchema";
import { SocialHandle } from "@src/Database/Schemas/SocialHandleSchema";
import { SameAs } from "@src/Database/Schemas/SameAsSchema";

export interface PersonSchema extends Document {
    lastName: string;
    firstName: string;
    slug: string;
    nickname: string;
    description: string;
    shortDescription: string;
    occupations: [SkillGroup];
    domains: [DomainListSchema];
    mainImage: Media; //ça fonctionne ça ?
    catchphrase: string;
    contactPoint: ContactPoint;
    url: [SocialHandle];
    region: string;
    badges: [string];
    sameAs: [SameAs];
    meta: Meta;
}

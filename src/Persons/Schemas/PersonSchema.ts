import { Document, ObjectId } from "mongoose";
import { Meta } from "../../Moderation/Schemas/MetaSchema";
import { DomainListSchema } from "../../Taxonomy/Schemas/DomainListSchema";
import { SkillGroupSchema } from "../../Taxonomy/Schemas/SkillGroupSchema";
import { ContactPointSchema } from "@src/Database/Schemas/ContactPointSchema";
import { SocialHandleSchema } from "@src/Database/Schemas/SocialHandleSchema";
import { UriSchema } from "@src/Database/Schemas/URISchema";

export interface PersonSchema extends Document {
    lastName: string;
    firstName: string;
    slug: string;
    nickname: string;
    description: string;
    shortDescription: string;
    occupations: [SkillGroupSchema];
    domains: [DomainListSchema];
    mainImage: ObjectId;
    catchphrase: string;
    contactPoint: ContactPointSchema;
    url: [SocialHandleSchema];
    region: string;
    badges: [string];
    meta: Meta;
    uri: UriSchema;
}

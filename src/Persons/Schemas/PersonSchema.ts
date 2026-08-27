import { Document, ObjectId } from "mongoose";
import { Meta } from "../../Moderation/Schemas/MetaSchema";
import { DomainListSchema } from "../../Taxonomy/Schemas/DomainListSchema";
import { SkillGroupSchema } from "../../Taxonomy/Schemas/SkillGroupSchema";
import { ContactPointSchema } from "@src/Database/Schemas/ContactPointSchema";
import { SocialHandleSchema } from "@src/Database/Schemas/SocialHandleSchema";
import { UriObject } from "@src/Database/Schemas/URISchema";
import { SameAs } from "@src/Database/Schemas/SameAsSchema";

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
    sameAs: [SameAs];
    meta: Meta;
    uri: UriObject;
}

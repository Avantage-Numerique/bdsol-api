import { Document, ObjectId } from "mongoose";
import { Meta } from "@src/Moderation/Schemas/MetaSchema";
import { MemberSchema } from "@src/SubProperty/Team/Schemas/MemberSchema";
import { SponsorSchema } from "@database/Schemas/SponsorSchema";
import { ScheduleBudgetSchema } from "@database/Schemas/ScheduleBudgetSchema";
import { ProjectContextEnum } from "../ProjectContextEnum";
import { DomainListSchema } from "@src/Taxonomy/Schemas/DomainListSchema";
import { SocialHandleSchema } from "@src/Database/Schemas/SocialHandleSchema";
import { ContactPointSchema } from "@src/Database/Schemas/ContactPointSchema";
import { MediaSchema } from "@src/Media/Schemas/MediaSchema";
import { UriObject } from "@src/Database/Schemas/URISchema";

export interface ProjectSchema extends Document {
    name: string;
    slug: string;
    alternateName: string;
    entityInCharge: [ObjectId];
    producer: [ObjectId];
    description: string;
    shortDescription: string;
    url: [SocialHandleSchema];
    contactPoint: ContactPointSchema;
    location: [ObjectId];
    team: [MemberSchema];
    mainImage: MediaSchema;
    sponsor: [SponsorSchema];
    scheduleBudget: ScheduleBudgetSchema;
    skills: [ObjectId];
    domains: [DomainListSchema];
    context: ProjectContextEnum;
    equipment: [ObjectId];
    meta: Meta;
    uri: UriObject;
}

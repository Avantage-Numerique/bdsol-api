import { Document } from "mongoose";
import { Meta } from "@src/Moderation/Schemas/MetaSchema";
import { Member } from "@src/SubProperty/Team/Schemas/MemberSchema";
import Media from "@src/Media/Models/Media";
import { ObjectId } from "mongodb";
import { Sponsor } from "@database/Schemas/SponsorSchema";
import { ScheduleBudget } from "@database/Schemas/ScheduleBudgetSchema";
import { ProjectContextEnum } from "../ProjectContextEnum";
import { DomainListSchema } from "@src/Taxonomy/Schemas/DomainListSchema";
import { SocialHandle } from "@src/Database/Schemas/SocialHandleSchema";
import { ContactPoint } from "@src/Database/Schemas/ContactPointSchema";

export interface ProjectSchema extends Document {
    name: string;
    slug: string;
    alternateName: string;
    entityInCharge: [ObjectId];
    producer: [ObjectId];
    description: string;
    url: [SocialHandle];
    contactPoint: ContactPoint;
    location: [ObjectId];
    team: [Member];
    mainImage: Media;
    sponsor: [Sponsor];
    scheduleBudget: ScheduleBudget;
    skills: [ObjectId];
    domains: [DomainListSchema];
    context: ProjectContextEnum;
    equipment: [ObjectId];
    meta: Meta;
}

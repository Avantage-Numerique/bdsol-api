import { ObjectId } from "mongodb";
import Media from "@src/Media/Models/Media";
import { DomainListSchema } from "@src/Taxonomy/Schemas/DomainListSchema";
import { Meta } from "@src/Moderation/Schemas/MetaSchema";
import { Document } from "mongoose";
import { Member } from "@src/SubProperty/Team/Schemas/MemberSchema";
import { Schedule } from "@src/Database/Schemas/ScheduleSchema";
import { EventFormatEnum } from "../EventFormatEnum";
import { SocialHandle } from "@src/Database/Schemas/SocialHandleSchema";
import { ContactPoint } from "@src/Database/Schemas/ContactPointSchema";
import { SameAs } from "@src/Database/Schemas/SameAsSchema";

export interface EventSchema extends Document {
    name: string;
    slug: string;
    alternateName: string;
    url: [SocialHandle];
    description: string;
    shortDescription: string;
    entityInCharge: ObjectId;
    organizer: ObjectId;
    eventType: [ObjectId];
    eventFormat: EventFormatEnum;
    team: [Member];
    startDate: Date;
    endDate: Date;
    contactPoint: ContactPoint;
    mainImage: Media;
    attendees: [ObjectId];
    domains: [DomainListSchema];
    skills: [ObjectId];
    schedule: [Schedule];
    subEvents: [ObjectId];
    location: [ObjectId];
    photoGallery: ObjectId;
    sameAs: [SameAs];
    meta: Meta;
}

import {ObjectId} from "mongodb";
import Media from "@src/Media/Models/Media";
import {DomainSchema} from "@src/Taxonomy/Schemas/DomainSchema";
import {Meta} from "@src/Moderation/Schemas/MetaSchema";
import {Document} from "mongoose";
import {Member} from "@src/Team/Schemas/MemberSchema";
import {Schedule} from "@src/Database/Schemas/ScheduleSchema";
import {EventFormatEnum} from "../EventFormatEnum";
import { SocialHandle } from "@src/Database/Schemas/SocialHandleSchema";
import { ContactPoint } from "@src/Database/Schemas/ContactPointSchema";

export interface EventSchema extends Document {
    name:string;
    slug:string;
    alternateName:string;
    url:[SocialHandle];
    description:string;
    entityInCharge:ObjectId;
    organizer:ObjectId;
    eventType:[ObjectId];
    eventFormat:EventFormatEnum;
    team:[Member];
    startDate:Date;
    endDate:Date;
    contactPoint:ContactPoint;
    mainImage:Media;
    attendees:[ObjectId];
    domains:[DomainSchema];
    skills:[ObjectId];
    schedule:[Schedule];
    subEvents:[ObjectId];
    location:[ObjectId];
    photoGallery:ObjectId;
    meta:Meta;
}
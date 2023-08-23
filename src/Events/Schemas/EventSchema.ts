import { ObjectId } from "mongodb";
import Media from "@src/Media/Models/Media";
import { DomainSchema } from "@src/Taxonomy/Schemas/DomainSchema";
import { Status } from "@src/Moderation/Schemas/StatusSchema";
import {Document} from "mongoose";
import { Member } from "@src/Team/Schemas/MemberSchema";
import { Schedule } from "@src/Database/Schemas/ScheduleSchema";
import { EventFormatEnum } from "../EventFormatEnum";

export interface EventSchema extends Document {
    name:string
    slug:string
    alternateName:string
    url:string
    description:string
    entityInCharge:ObjectId
    organizer:ObjectId
    eventType:[ObjectId]
    eventFormat:EventFormatEnum
    team:[Member]
    startDate:Date
    endDate:Date
    contactPoint:string
    mainImage:Media
    attendees:[ObjectId]
    domains:[DomainSchema]
    skills:[ObjectId]
    experience:[ObjectId]
    schedule:[Schedule]
    subEvents:[ObjectId]
    location:[ObjectId]
    status:Status
}
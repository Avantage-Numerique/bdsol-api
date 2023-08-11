import { ObjectId } from "mongodb";
import Media from "@src/Media/Models/Media";
import { DomainSchema } from "@src/Taxonomy/Schemas/DomainSchema";
import { Status } from "@src/Moderation/Schemas/StatusSchema";
import {Document} from "mongoose";
import { Member } from "@src/Team/Schemas/MemberSchema";
import { Schedule } from "@src/Database/Schemas/ScheduleSchema";

export interface EventSchema extends Document {
    name:string
    slug:string
    alternateName:string
    url:string
    description:string
    entityInCharge:ObjectId
    organizer:ObjectId
    eventType:[ObjectId]
    team:[Member]
    //duration:string
    //location:string
    startDate:Date
    endDate:Date
    contactPoint:string
    mainImage:Media
    attendees:[ObjectId]
    domains:[DomainSchema]
    skills:[ObjectId]
    //experience:string
    schedule:[Schedule]
    subEvents:[ObjectId]
    status:Status
}
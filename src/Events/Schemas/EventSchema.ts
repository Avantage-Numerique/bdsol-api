import { ObjectId } from "mongodb";
import Media from "@src/Media/Models/Media";
import { DomainSchema } from "@src/Taxonomy/Schemas/DomainSchema";
import { Status } from "@src/Moderation/Schemas/StatusSchema";
import {Document} from "mongoose";
import { Member } from "@src/Team/Schemas/MemberSchema";
import { EventTypeEnum } from "../EventTypeEnum";

export interface EventSchema extends Document {
    name:string
    slug:string
    alternateName:string
    description:string
    entityInCharge:ObjectId
    organizer:ObjectId
    eventType:EventTypeEnum
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
    subEvents:[ObjectId]
    status:Status
}
import {Document} from "mongoose";
import {Meta} from "@src/Moderation/Schemas/MetaSchema";
import {Member} from "@src/Team/Schemas/MemberSchema";
import Media from "@src/Media/Models/Media";
import {ObjectId} from "mongodb";
import {Sponsor} from "@database/Schemas/SponsorSchema";
import {ScheduleBudget} from "@database/Schemas/ScheduleBudgetSchema";
import {ProjectContextEnum} from "../ProjectContextEnum";
import {DomainSchema} from "@src/Taxonomy/Schemas/DomainSchema";

export interface ProjectSchema extends Document {
    name:string;
    slug:string;
    alternateName:string;
    entityInCharge:ObjectId;
    producer: ObjectId;
    description:string;
    url:string;
    contactPoint:string;
    location:[ObjectId];
    team:[Member];
    mainImage:Media;
    sponsor:[Sponsor];
    scheduleBudget:ScheduleBudget;
    skills:[ObjectId];
    domains:[DomainSchema];
    context: ProjectContextEnum;
    equipment: [ObjectId];
    meta: Meta
}
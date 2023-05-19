import {Document} from "mongoose";
import { Status } from "../../Moderation/Schemas/StatusSchema";
import { Member } from "../../Team/Schemas/MemberSchema";
import Media from "../../Media/Models/Media";
import { ObjectId } from "mongodb";
import { Sponsor } from "../../Database/Schemas/SponsorSchema";
import { ScheduleBudget } from "../../Database/Schemas/ScheduleBudgetSchema";
import { Location } from "../../Database/Schemas/LocationSchema";
import { ProjectContextEnum } from "../ProjectContextEnum";

export interface ProjectSchema extends Document {
    name:string;
    slug:string;
    alternateName:string;
    entityInCharge:ObjectId;
    producer: ObjectId;
    description:string;
    url:string;
    contactPoint:string;
    location:Location;
    team:[Member];
    mainImage:Media;
    sponsor:[Sponsor];
    scheduleBudget:ScheduleBudget;
    skills:[ObjectId];
    context: ProjectContextEnum
    status: Status
}
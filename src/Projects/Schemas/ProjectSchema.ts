import mongoose, {Document} from "mongoose";
import { Status } from "../../Moderation/Schemas/StatusSchema";
import { Member } from "../../Database/Schemas/MemberSchema";
import Media from "../../Media/Models/Media";
import { ObjectId } from "mongodb";
import { Sponsor } from "../../Database/Schemas/SponsorSchema";
import { ScheduleBudget } from "../../Database/Schemas/ScheduleBudgetSchema";
import { Location } from "../../Database/Schemas/LocationSchema";

export interface ProjectSchema extends Document {
    name:string;
    alternateName:string;
    description:string;
    url:string;
    contactPoint:string;
    location:Location;
    team:[Member];
    mainImage:Media;
    sponsor:[Sponsor];
    scheduleBudget:ScheduleBudget;
    skills:[ObjectId];
    status: Status

}
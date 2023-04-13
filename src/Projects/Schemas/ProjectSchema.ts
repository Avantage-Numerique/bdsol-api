import mongoose, {Document} from "mongoose";
import { Status } from "../../Moderation/Schemas/StatusSchema";
import { Member } from "../../Database/Schemas/MemberSchema";
import Media from "../../Media/Models/Media";
import { ObjectId } from "mongodb";

export interface ProjectSchema extends Document {
    name:string;
    alternateName:string;
    description:string;
    url:string;
    contactPoint:string;
    location:string;
    team:[Member];
    mainImage:Media;
    sponsor:[string];
    scheduleBudget:string;
    skills:[ObjectId];
    status: Status

}
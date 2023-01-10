import {Document} from "mongoose";
import { Media } from "../../Database/Schemas/MediaSchema";
import { Status } from "../../Moderation/Schemas/StatusSchema";

export interface PersonSchema extends Document {
    lastName:string;
    firstName:string;
    slug:string;
    nickname:string;
    description:string;
    occupations:[object];
    portrait:Media
    status: Status;
}
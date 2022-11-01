import {Document} from "mongoose";
import { Status } from "../../Moderation/Schemas/StatusSchema";

export interface PersonSchema extends Document {
    lastName:string;
    firstName:string;
    slug:string;
    nickname:string;
    description:string;
    occupations:[object];
    status: Status;
}
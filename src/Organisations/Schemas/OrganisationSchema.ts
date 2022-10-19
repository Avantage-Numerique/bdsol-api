import mongoose from "mongoose";
import {Document} from "mongoose"
import { Member } from "../../Database/Schemas/MemberSchema";

export interface OrganisationSchema extends Document {
    name:string;
    slug:string;
    description:string;
    url:string;
    contactPoint:string;
    fondationDate:Date;
    offers:[object],
    team: [Member],
}

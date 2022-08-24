import mongoose from "mongoose";
import {Document} from "mongoose"

export interface OrganisationSchema extends Document {
    name:string;
    slug:string;
    description:string;
    url:string;
    contactPoint:string;
    fondationDate:Date;
    offers:mongoose.ObjectId
}

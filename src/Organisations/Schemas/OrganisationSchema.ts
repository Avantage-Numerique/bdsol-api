import mongoose from "mongoose";
import {Document} from "mongoose"

export interface OrganisationSchema extends Document {
    name:string;
    description:string;
    url:string;
    contactPoint:string;
    fondationDate:Date;
    offer:mongoose.ObjectId
}

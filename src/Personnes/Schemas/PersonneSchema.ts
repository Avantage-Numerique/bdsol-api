import mongoose from "mongoose";
import {Document} from "mongoose"

export interface PersonneSchema extends Document {
    lastName:string;
    firstName:string;
    nickname:string;
    description:string;
    occupation:[mongoose.Types.ObjectId];
}
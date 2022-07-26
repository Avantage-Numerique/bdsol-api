import mongoose from "mongoose";
import {Document} from "mongoose"

export interface UserHistorySchema extends Document {
    user: mongoose.ObjectId;
    ipAddress: string;
    modifDate: Date;
    action: string;
    modifiedEntity: mongoose.ObjectId;
    fields: object;
}
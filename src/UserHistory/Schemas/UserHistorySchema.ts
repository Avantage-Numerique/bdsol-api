import mongoose from "mongoose";
import {Document} from "mongoose"

export interface UserHistorySchema extends Document {
    user: mongoose.ObjectId;
    token: string;
    ipAddress: string;
    modifDate: Date;
    modifiedEntity: mongoose.ObjectId;
    action: string;
    fields: object;
}
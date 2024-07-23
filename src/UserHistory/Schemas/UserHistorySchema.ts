import mongoose, {Document} from "mongoose";

export interface UserHistorySchema extends Document {
    user: mongoose.ObjectId;
    ipAddress?: string;
    modifDate: Date;
    action: string;
    entityCollection: string;
    modifiedEntity: mongoose.ObjectId;
    fields: object;
}
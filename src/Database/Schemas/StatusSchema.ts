import mongoose, {Schema} from "mongoose";

/**
 * Enum list of all status supported for now.
 */
 export enum StatusStates {
    accepted = "accepted",
    pending = "pending",
    rejected = "rejected",
    deprecated = "deprecated"
}

export interface StatusSchema extends Document {
    state: StatusStates;
    requestedBy: mongoose.ObjectId;
    lastModifiedBy: mongoose.ObjectId;
    message: string;
}

export class Status {
    static schema:Schema = 
    new Schema<StatusSchema>({
        state: {
            type: String,
            enum: StatusStates,
            //required: true
        },
        //The user who request the change
        requestedBy: {
            type: mongoose.Types.ObjectId,
        },
        //The last user that modified the status
        lastModifiedBy: {
            type: mongoose.Types.ObjectId,
            //required: true
        },
        //If need to have a message attached to it (Reason to add taxonomy, comment...)
        message: {
            type: String,
        }
    });
}
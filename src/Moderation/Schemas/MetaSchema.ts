import mongoose, {Document, Schema} from "mongoose";

/**
 * Enum list of all status supported for now.
 */
export enum MetaStates {
    accepted = "accepted",
    pending = "pending",
    rejected = "rejected",
    deprecated = "deprecated"
}

export interface MetaSchema extends Document {
    state: MetaStates;
    requestedBy: mongoose.ObjectId;
    lastModifiedBy: mongoose.ObjectId;
    message: string;
    statistics: Number;
}

export class Meta {

    static schema: Schema = new Schema<MetaSchema>({
        state: {
            type: String,
            enum: MetaStates,
            //required: true
        },
        //The user who requested the creation
        requestedBy: {
            type: mongoose.Types.ObjectId,
        },
        //The last user that modified the entity
        lastModifiedBy: {
            type: mongoose.Types.ObjectId,
            //required: true
        },
        //If need to have a message attached to it (Reason to add taxonomy, comment...)
        message: {
            type: String,
        },
        statistics: {
            count: Number
        }
    }, { _id : false });
}

export interface SubMetaSchema extends Document {
    order: number; 
}

export class SubMeta {
    static schema: Schema = new Schema<SubMetaSchema>({
        order: {
            type: Number
        }
    }, {_id : false });
}
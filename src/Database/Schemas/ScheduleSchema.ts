import {Document, Schema} from "mongoose";
import {SubMeta} from "@src/Moderation/Schemas/MetaSchema";


export interface ScheduleSchema extends Document {
    name: string;
    startDate: Date;
    startTime: string;
    endDate: Date;
    endTime: string;
    subMeta:SubMeta
}


export class Schedule {

    /** @static schema */
    static schema:Schema =
    new Schema<ScheduleSchema>({
        name: {
            type:String
        },
        startDate: {
            type: Date
        },
        startTime: {
            type: String
        },
        endDate:{
            type: Date
        },
        endTime:{
            type: String
        },
        subMeta: {
            type: SubMeta.schema
        }
    },{ _id : false }
    );
}

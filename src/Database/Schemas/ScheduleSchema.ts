import {Document, Schema} from "mongoose";
import {Status} from "@src/Moderation/Schemas/StatusSchema";


export interface ScheduleSchema extends Document {
    name: string;
    startDate: Date;
    startTime: string;
    endDate: Date;
    endTime: string;
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
        }
    },{ _id : false }
    );
}

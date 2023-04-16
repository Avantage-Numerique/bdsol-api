import mongoose, {Schema} from "mongoose";
import { Status } from "../../Moderation/Schemas/StatusSchema";


export interface ScheduleBudgetSchema extends Document {
    launchDate: Date;
    completionEstimateDate: Date;
    completionDate: Date;
    estimatedTotalBudget: number;
    estimatedTimeToComplete: string;
    plannedScheduleBudget: [object];
    status: Status;
}


export class ScheduleBudget {

    /** @static schema */
    static schema:Schema =
    new Schema<ScheduleBudgetSchema>({
        launchDate: {
            type: Date
        },
        completionEstimateDate: {
            type: Date
        },
        completionDate: {
            type: Date
        },
        estimatedTotalBudget: {
            type: Number,
        },
        estimatedTimeToComplete: {
            type: String,
        },
        plannedScheduleBudget: {
            type: [Object],
        },
        status: {
            type: Status.schema,
            //required: true
        }
    },
        {
            timestamps: true
        }
    );
}
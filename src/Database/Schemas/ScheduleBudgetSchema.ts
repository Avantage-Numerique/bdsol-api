import mongoose, {Schema} from "mongoose";
import { Status } from "../../Moderation/Schemas/StatusSchema";

export enum budgetRangeEnum {
    zeroToThousand = "0-1000",
    thousandToFiveThousand = "1k-5k",
    fiveToTenThousand = "5k-10k",
    tenToTwentyThousand= "10k-20k",
    twentyOrMore = "20k+"
}

export interface TimeframeSchema extends Document {
    step: string;
    eta: string;
    budgetRange: string;
}

export class Timeframe {
    /** @static schema */
    static schema:Schema =
    new Schema<TimeframeSchema>({
        step: {
            type: String,
        },
        eta: {
            type: String,
        },
        budgetRange: {
            type: String,
            enum: budgetRangeEnum
        }
    })

}


export interface ScheduleBudgetSchema extends Document {
    startDate: Date;
    endDateEstimate: Date;
    completionDate: Date;
    estimatedTotalBudget: number;
    eta: string;
    timeframe: [Timeframe];
    status: Status;
}


export class ScheduleBudget {

    /** @static schema */
    static schema:Schema =
    new Schema<ScheduleBudgetSchema>({
        startDate: {
            type: Date
        },
        endDateEstimate: {
            type: Date
        },
        completionDate: {
            type: Date
        },
        estimatedTotalBudget: {
            type: Number,
        },
        eta: {
            type: String,
        },
        timeframe: {
            type: [Timeframe.schema],
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

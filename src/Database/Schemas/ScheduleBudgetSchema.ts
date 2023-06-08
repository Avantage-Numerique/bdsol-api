import {Document, Schema} from "mongoose";
import {Status} from "@src/Moderation/Schemas/StatusSchema";

export enum BudgetRangeEnum {
    zeroToThousand = "0-1k",
    thousandToFiveThousand = "1k-5k",
    fiveToTenThousand = "5k-10k",
    tenToTwentyFiveThousand= "10k-25k",
    twentyFiveToFiftyThousand = "25k-50k",
    fiftyToHundred = "50k-100k",
    hundredOrMore = "100k+"
}

export enum TimeframeEtaEnum {
    aDay = "1 day",
    aWeek = "1 week",
    twoWeek = "2 week",
    aMonth = "1 month",
    threeMonth = "3 month",
    sixMonth = "6 month",
    aYear = "1 year",
    twoYear = "2 year",
    threeYear = "3 year",
    fiveYearOrMore = "5 year +"
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
            enum: TimeframeEtaEnum
        },
        budgetRange: {
            type: String,
            enum: BudgetRangeEnum
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
    },{ _id : false }
    );
}

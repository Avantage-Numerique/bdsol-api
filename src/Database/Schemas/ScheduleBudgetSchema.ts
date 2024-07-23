import {Document, Schema} from "mongoose";
import {SubMeta} from "@src/Moderation/Schemas/MetaSchema";

export enum BudgetRangeEnum {
    "" = "",
    "0$ à 1 000$" = "0-1k",
    "1 000$ à 5 000$" = "1k-5k",
    "5 000$ à 10 000$" = "5k-10k",
    "10 000$ à 25 000$"= "10k-25k",
    "25 000$ à 50 000$" = "25k-50k",
    "50 000$ à 100 000$" = "50k-100k",
    "Plus de 100 000$" = "100k+"
}

export enum TimeframeEtaEnum {
    "Une journée" = "1 day",
    "Une semaine" = "1 week",
    "2 semaines" = "2 week",
    "1 mois" = "1 month",
    "3 mois" = "3 month",
    "6 mois" = "6 month",
    "Une année" = "1 year",
    "2 ans" = "2 year",
    "3 ans" = "3 year",
    "5 ans ou plus" = "5 year +"
}

export interface TimeframeSchema extends Document {
    step: string;
    eta: string;
    budgetRange: string;
    subMeta: SubMeta
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
        },
        subMeta: {
            type: SubMeta.schema
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
    subMeta: SubMeta;
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
        subMeta: {
            type: SubMeta.schema,
            //required: true
        }
    },{ _id : false }
    );
}

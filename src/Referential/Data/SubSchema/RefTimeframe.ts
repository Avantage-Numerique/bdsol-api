import { BudgetRangeEnum, TimeframeEtaEnum } from "@src/Database/Schemas/ScheduleBudgetSchema";
import { RefProperty } from "../types";
import { createPrimitiveUrl, createRefType } from "../utils";
import { refSubMeta } from "./RefSubMeta";
import AvnuCompatibility from "@ref/Data/Compatibility/Avnu";
import { refOrder } from "@ref/Data/Properties/RefOrder";

export const refTimeframe: RefProperty = {
    field: "timeframe",
    ontologyProperty: "avnu:timeframe",
    url: "/timeframe",
    label: "Échéancier par étapes",
    cardinality: "0..N",
    description: "Étape de progression, avec un temps estimé et un budget associé.",
    compatibility: [AvnuCompatibility.compatibilityMessage()],
    //note: "",

    type: createRefType("object"),
    ref: [
        {
            field: "step",
            type: createRefType("string"),
            ontologyProperty: "avnu:step",
            url: createPrimitiveUrl("step"),
            label: "Nom de l'étape",
            cardinality: "1..1",
            description: "Libellé descriptif de l'étape",
            compatibility: [AvnuCompatibility.compatibilityMessage()],
            //note: "",
        },
        {
            field: "eta",
            type: createRefType("string"),
            ontologyProperty: "avnu:timeframeEta",
            url: createPrimitiveUrl("timeframeEta"),
            label: "Durée estimé de l'étape",
            cardinality: "0..1",
            description: "Parmis l'enum TimeframeEtaEnum",
            compatibility: [AvnuCompatibility.compatibilityMessage()],
            constraints: {
                enum: TimeframeEtaEnum,
            },
            //note: "",
        },
        {
            field: "budgetRange",
            type: createRefType("string"),
            ontologyProperty: "avnu:budgetRange",
            url: createPrimitiveUrl("budgetRange"),
            label: "Budget estimé pour l'étape",
            cardinality: "0..1",
            description: "Parmis l'enum BudgetRangeEnum",
            compatibility: [AvnuCompatibility.compatibilityMessage()],
            constraints: {
                enum: BudgetRangeEnum,
            },
            //note: "",
        },
        { ...refOrder },
    ],
};

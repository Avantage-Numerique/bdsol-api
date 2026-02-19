import { RefProperty } from "../types";
import { createPrimitiveUrl, createRefType } from "../utils";
import { refSubMeta } from "./RefSubMeta";

export const refTimeframe: RefProperty = {
    field: "timeframe",
    ontologyProperty: "avnu:timeframe",
    url: "/timeframe",
    label: "Échéancier par étapes",
    cardinality: "0..N",
    description: "Étape de progression, avec un temps estimé et un budget associé.",
    compatibility: [],
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
            compatibility: [],
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
            compatibility: [],
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
            compatibility: [],
            //note: "",
        },
        { ...refSubMeta },
    ],
};

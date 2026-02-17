import { RefEntityOrSchema } from "../types";
import { refSubMeta } from "./RefSubMeta";

export const refTimeframe: RefEntityOrSchema = {
    field: "timeframe",
    ontologyProperty: "avnu:timeframe",
    url: "/timeframe",
    label: "Échéancier par étapes",
    cardinality: "0..N",
    description: "Étape de progression, avec un temps estimé et un budget associé.",
    compatibility: [],
    //note: "",

    type: "object",
    ref: [
        {
            field: "step",
            type: "string",
            //ontologyProperty,
            //url,
            label: "Nom de l'étape",
            cardinality: "1..1",
            description: "Libellé descriptif de l'étape",
            compatibility: [],
            //note: "",
        },
        {
            field: "eta",
            type: "string",
            //ontologyProperty,
            //url,
            label: "Durée estimé de l'étape",
            cardinality: "0..1",
            description: "Parmis l'enum TimeframeEtaEnum",
            compatibility: [],
            //note: "",
        },
        {
            field: "budgetRange",
            type: "string",
            //ontologyProperty,
            //url,
            label: "Budget estimé pour l'étape",
            cardinality: "0..1",
            description: "Parmis l'enum BudgetRangeEnum",
            compatibility: [],
            //note: "",
        },
        { ...refSubMeta },
    ],
};

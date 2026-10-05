import { RefProperty } from "@ref/Data/types";
import { refTimeframe } from "./RefTimeframe";
import { createPrimitiveUrl, createRefType } from "@ref/Data/utils";
import AvnuCompatibility from "@ref/Data/Compatibility/Avnu";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";

export const refScheduleBudget: RefProperty = {
    field: "scheduleBudget",
    ontologyProperty: "avnu:scheduleBudget",
    url: "/scheduleBudget",
    label: "Échéancier et budget",
    cardinality: "0..1",
    description: "Échéancier et budget général et/ou par étapes.",
    compatibility: [AvnuCompatibility.compatibilityMessage()],
    //note: "",

    type: createRefType("object"),
    ref: [
        {
            field: "startDate",
            ontologyProperty: "avnu:budgetStartDate",
            url: createPrimitiveUrl("budgetStartDate"),
            type: createRefType("date"),
            label: "Date de début",
            cardinality: "0..1",
            description: "Date de début",
            compatibility: [SchemaOrgCompatibility.getOntologyCompatibilityArray("DateTime")],
            //note: "",
        },
        {
            field: "endDateEstimate",
            ontologyProperty: "avnu:endDateEstimate",
            url: createPrimitiveUrl("endDateEstimate"),
            type: createRefType("date"),
            label: "Estimé de la date de fin",
            cardinality: "0..1",
            description: "Estimé de la date de fin",
            compatibility: [SchemaOrgCompatibility.getOntologyCompatibilityArray("DateTime")],
            //note: "",
        },
        {
            field: "completionDate",
            ontologyProperty: "avnu:completionDate",
            url: createPrimitiveUrl("completionDate"),
            type: createRefType("date"),
            label: "Date d'aboutissement du projet",
            cardinality: "0..1",
            description: "Date de la fin du projet",
            compatibility: [SchemaOrgCompatibility.getOntologyCompatibilityArray("DateTime")],
            //note: "",
        },
        {
            field: "estimatedTotalBudget",
            ontologyProperty: "avnu:estimatedTotalBudget",
            url: createPrimitiveUrl("estimatedTotalBudget"),
            type: createRefType("number"),
            label: "Budget total estimé",
            cardinality: "0..1",
            description: "estimatedTotalBudget",
            compatibility: [AvnuCompatibility.compatibilityMessage()],
            //note: "",
        },
        {
            field: "eta",
            ontologyProperty: "avnu:budgetEta",
            url: createPrimitiveUrl("budgetEta"),
            type: createRefType("string"),
            label: "Durée estimée du projet",
            cardinality: "0..1",
            description: "Durée estimé du projet",
            compatibility: [AvnuCompatibility.compatibilityMessage()],
            //note: "",
        },
        { ...refTimeframe },
    ],
};

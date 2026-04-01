import { RefVocabulary } from "../types";
import EnumHelper from "@src/Helpers/EnumHelper";
import { BudgetRangeEnum } from "@database/Schemas/ScheduleBudgetSchema";

export const refBudgetRanges: RefVocabulary = {
    name: "budgetRanges",
    ontologyProperty: "avnu:budgetRanges",
    url: "/vocabularies/budgetRanges",
    label: "Bracket de prix",
    apiType: "enum",
    apiSource: EnumHelper.enumToSelectOptions(BudgetRangeEnum),
    compatibility: [],
    description: "Utiliser pour décrire un projet et ses étapes.",
};

import { RefVocabulary } from "@ref/Data/types";
import EnumHelper from "@src/Helpers/EnumHelper";
import { TimeframeEtaEnum } from "@database/Schemas/ScheduleBudgetSchema";

export const refTimeFrameEta: RefVocabulary = {
    name: "timeframeEta",
    ontologyProperty: "avnu:timeframeEta",
    url: "/vocabularies/timeframeEta",
    label: "Durée approximative d'une étape dans un projet",
    apiType: "enum",
    apiSource: EnumHelper.enumToSelectOptions(TimeframeEtaEnum),
    compatibility: [],
    description: "Liste des valeurs possible pour décrire une étape dans la réalisation d'un projet.",
};

import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefVocabulary } from "../types";
import EnumHelper from "@src/Helpers/EnumHelper";

export const refEventTypes: RefVocabulary = {
    name: "eventTypes",
    ontologyProperty: "avnu:eventTypes",
    url: "/vocabularies/eventTypes",
    label: "Types d'événement",
    apiType: "dynamic",
    apiSource: EnumHelper.enumToSelectOptions(EntityTypesEnum),
    compatibility: [],
    description: "Liste des types d'événements présentement disponible dans AVNU.",
};

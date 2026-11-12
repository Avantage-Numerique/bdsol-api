import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefVocabulary } from "@ref/Data/types";
import EnumHelper from "@src/Helpers/EnumHelper";

export const refEntityTypes: RefVocabulary = {
    name: "entityTypes",
    ontologyProperty: "avnu:entityTypes",
    url: "/vocabularies/entityTypes",
    label: "Types d'entités",
    apiType: "enum",
    apiSource: EnumHelper.enumToSelectOptions(EntityTypesEnum),
    compatibility: [],
    description: "Liste des types d'entités supportés par avnu.",
};

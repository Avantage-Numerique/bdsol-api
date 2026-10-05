import { RefVocabulary } from "@ref/Data/types";
import EnumHelper from "@src/Helpers/EnumHelper";
import { TaxonomiesCategoriesEnum } from "@src/Taxonomy/TaxonomiesCategoriesEnum";

export const refDynamicTaxonomyCategories: RefVocabulary = {
    name: "dynamicTaxonomyCategories",
    ontologyProperty: "avnu:dynamicTaxonomyCategories",
    url: "/vocabularies/dynamicTaxonomyCategories",
    label: "Catégories des taxonomies",
    apiType: "enum",
    apiSource: EnumHelper.enumToSelectOptions(TaxonomiesCategoriesEnum),
    compatibility: [],
    description: "Liste des catégories de taxonomies dynamique disponible dans AVNU.",
};

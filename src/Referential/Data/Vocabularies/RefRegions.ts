import { RegionEnum } from "@src/SubProperty/Badges/RegionEnum";
import { RefVocabulary } from "@ref/Data/types";
import EnumHelper from "@src/Helpers/EnumHelper";

export const refRegions: RefVocabulary = {
    name: "regions",
    ontologyProperty: "avnu:regions",
    url: "/vocabularies/regions",
    label: "Les régions supporté en ce moment dans AVNU",
    apiType: "enum",
    apiSource: EnumHelper.enumToSelectOptions(RegionEnum),
    compatibility: [],
    description: "Utilisé surtout pour associé une fiche à une badge du croissant boréal.",
};

//eventAttendanceMode
import { RefVocabulary } from "@ref/Data/types";
import EnumHelper from "@src/Helpers/EnumHelper";
import { ProjectContextEnum } from "@src/Projects/ProjectContextEnum";

export const refProjectContext: RefVocabulary = {
    name: "projectContextes",
    ontologyProperty: "avnu:projectContextes",
    url: "/vocabularies/projectContext",
    label: "Le context du projet",
    apiType: "enum",
    apiSource: EnumHelper.enumToSelectOptions(ProjectContextEnum),
    compatibility: [],
    description: "Dans quel contexte un projet a été fait.",
};

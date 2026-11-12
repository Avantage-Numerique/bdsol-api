//eventAttendanceMode
import { RefVocabulary } from "@ref/Data/types";
import { EventFormatEnum } from "@src/Events/EventFormatEnum";
import EnumHelper from "@src/Helpers/EnumHelper";

export const refAttendanceMode: RefVocabulary = {
    name: "eventAttendanceMode",
    ontologyProperty: "avnu:eventAttendanceMode",
    url: "/vocabularies/eventAttendanceMode",
    label: "Attendance Mode (événements)",
    apiType: "enum",
    apiSource: EnumHelper.enumToSelectOptions(EventFormatEnum),
    compatibility: [],
    description: "Toutes les modes que l'on peut participer à un événements",
};

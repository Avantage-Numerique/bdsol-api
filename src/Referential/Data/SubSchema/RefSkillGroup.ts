import { RefProperty } from "../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { createPrimitiveUrl, createRefType } from "../utils";
import AvnuCompatibility from "@ref/Data/Compatibility/Avnu";
import { refOrder } from "@ref/Data/Properties/RefOrder";

export const refSkillGroup: RefProperty = {
    //field: "offers"||"occupations",
    ontologyProperty: "avnu:skillgroup",
    label: "Groupe de compétences",
    url: "/skillgroup",
    cardinality: "0..N",
    description:
        "Groupe de compétences, habiletés et/ou de technologies, tirés de notre base de données, accompagné d'un libellé qui décrit le regroupement.",

    compatibility: [AvnuCompatibility.compatibilityMessage()],
    type: createRefType("object"),
    ref: [
        {
            field: "groupName",
            ontologyProperty: "avnu:groupName",
            url: createPrimitiveUrl("groupName"),
            label: "Nom du groupe",
            type: createRefType("string"),
            cardinality: "1..1",
            description: "Libellé utilisé par la personne pour décrire son groupe de compétences",
            compatibility: [AvnuCompatibility.compatibilityMessage()],
        },
        {
            field: "skills",
            ontologyProperty: "avnu:skills",
            url: "/skills",
            label: "Compétences",
            type: createRefType("reference", [EntityTypesEnum.taxonomy]),
            description: "Liste de compétences, habiletés ou de technologies.",
            cardinality: "0..N",
            compatibility: [AvnuCompatibility.compatibilityMessage()],
        },
        { ...refOrder },
    ],
};

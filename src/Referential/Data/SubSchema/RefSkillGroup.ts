import { RefProperty } from "../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

import { refSubMeta } from "./RefSubMeta";
import { createRefType } from "../utils";

export const refSkillGroup: RefProperty = {
    //field: "offers"||"occupations",
    ontologyProperty: "avnu:skillgroup",
    label: "Groupe de compétences",
    url: "/skillgroup",
    cardinality: "0..N",
    description:
        "Groupe de compétences, habiletés et/ou de technologies, tirés de notre base de données, accompagné d'un libellé qui décrit le regroupement.",

    type: createRefType("object"),
    ref: [
        {
            field: "groupName",
            //ontologyProperty: "avnu:groupName",
            label: "Nom du groupe",
            type: createRefType("string"),
            description: "Libellé utilisé par la personne pour décrire son groupe de compétences",
        },
        {
            field: "skills",
            //ontologyProperty: "avnu:skills",
            label: "Compétences",
            type: createRefType("reference", [EntityTypesEnum.taxonomy]),
            description: "Liste de compétences, habiletés ou de technologies.",
        },
        { ...refSubMeta },
    ],
};

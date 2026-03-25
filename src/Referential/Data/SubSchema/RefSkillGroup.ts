import { RefProperty } from "../types";

import { refSubMeta } from "./RefSubMeta";
import { createPrimitiveUrl, createRefType } from "../utils";
import { refTaxonomyLink } from "../RelationLinks/RefTaxonomyLink";

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
            ontologyProperty: "avnu:groupName",
            url: createPrimitiveUrl("groupName"),
            cardinality: "0..1",
            label: "Nom du groupe",
            type: createRefType("string"),
            description: "Libellé utilisé par la personne pour décrire son groupe de compétences",
        },
        {
            ...refTaxonomyLink,
            field: "skills",
            label: "Compétences",
            description: "Liste de compétences, habiletés ou de technologies.",
        },
        { ...refSubMeta },
    ],
};

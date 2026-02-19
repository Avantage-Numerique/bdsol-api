import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefProperty } from "../types";
import { refSubMeta } from "./RefSubMeta";
import { createPrimitiveUrl, createRefType } from "../utils";

export const refSponsor: RefProperty = {
    field: "sponsor",
    ontologyProperty: "avnu:sponsor",
    url: "/sponsor",
    label: "Partenaires du projet",
    cardinality: "0..N",
    description: "Partenaires de projet, que ce soit au niveau moral, matériel, financier ou autres.",
    compatibility: [],
    //note: "",

    type: createRefType("object"),
    ref: [
        {
            field: "name",
            type: createRefType("string"),
            ontologyProperty: "avnu:sponsorName",
            url: createPrimitiveUrl("sponsorName"),
            label: "Qualificatif du partenaire. Exemple : Partenaire 'Or' ou Financeur principal",
            cardinality: "0..1",
            description: "",
            compatibility: [],
            //note: "",
        },
        {
            field: "entity",
            type: createRefType("reference", [EntityTypesEnum.person, EntityTypesEnum.organisation]),
            ontologyProperty: "avnu:sponsorEntity",
            url: "/sponsorEntity",
            label: "Référence à l'entité partenaire",
            cardinality: "0..1",
            description: "Référence à l'entité partenaire",
            compatibility: [],
            //note: "",
        },
        {
            field: "entityType",
            type: createRefType("string"),
            ontologyProperty: "avnu:sponsorEntityType",
            url: createPrimitiveUrl("sponsorEntityType"),
            label: "Type de l'entité du champ 'entity' de cet objet.",
            cardinality: "0..1",
            description: "À des fins de base de données",
            compatibility: [],
            //note: "",
        },
        { ...refSubMeta },
    ],
} satisfies RefProperty;

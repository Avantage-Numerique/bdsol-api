import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefEntityOrSchema } from "../types";
import { refSubMeta } from "./RefSubMeta";

export const refSponsor: RefEntityOrSchema = {
    field: "sponsor",
    ontologyProperty: "avnu:sponsor",
    url: "/sponsor",
    label: "Partenaires du projet",
    cardinality: "0..N",
    description: "Partenaires de projet, que ce soit au niveau moral, matériel, financier ou autres.",
    compatibility: [],
    //note: "",
    ref: [
        {
            field: "name",
            type: "string",
            //ontologyProperty,
            //url,
            label: "Qualificatif du partenaire. Exemple : Partenaire 'Or' ou Financeur principal",
            cardinality: "0..1",
            description: "",
            compatibility: [],
            //note: "",
        },
        {
            field: "entity",
            type: "id",
            entityRef: [EntityTypesEnum.person, EntityTypesEnum.organisation],
            //ontologyProperty,
            //url,
            label: "Référence à l'entité partenaire",
            cardinality: "0..1",
            description: "Référence à l'entité partenaire",
            compatibility: [],
            //note: "",
        },
        {
            field: "entityType",
            type: "string",
            //ontologyProperty,
            //url,
            label: "Type de l'entité du champ 'entity' de cet objet.",
            cardinality: "0..1",
            description: "À des fins de base de données",
            compatibility: [],
            //note: "",
        },
        { ...refSubMeta },
    ],
};

import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefEntityOrSchema } from "../types";
import { refSubMeta } from "./RefSubMeta";

export const refMember: RefEntityOrSchema = {
    //field: "member",
    ontologyProperty: "avnu:member",
    url: "/member",
    label: "Membre d'équipe",
    cardinality: "0..1",
    description: "Identifiant d'un membre d'équipe et le libellé de son rôle dans l'équipe.",
    compatibility: [],
    //note: "",
    ref: [
        {
            field: "member",
            type: "id",
            entityRef: [EntityTypesEnum.person],
            //ontologyProperty:"avnu:member",
            //url: "",
            label: "Membre de l'équipe",
            cardinality: "0..1",
            description: "",
            compatibility: [],
            //note: "",
        },
        {
            field: "role",
            type: "string",
            //ontologyProperty:"avnu:role",
            //url: "",
            label: "",
            cardinality: "0..1",
            description: "",
            compatibility: [],
            //note: "",
        },
        { ...refSubMeta },
    ],
};

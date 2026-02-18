import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefProperty } from "../types";
import { refSubMeta } from "./RefSubMeta";
import { createRefType } from "../utils";

export const refMember: RefProperty = {
    //field: "member",
    ontologyProperty: "avnu:member",
    url: "/member",
    label: "Membre d'équipe",
    cardinality: "0..1",
    description: "Identifiant d'un membre d'équipe et le libellé de son rôle dans l'équipe.",
    compatibility: [],
    //note: "",

    type: createRefType("object"),
    ref: [
        {
            field: "member",
            type: createRefType("reference", [EntityTypesEnum.person]),
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
            type: createRefType("string"),
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

import { RefProperty } from "../types";
import { createRefType } from "../utils";
import { refMember } from "./RefMember";

export const refTeam: RefProperty = {
    field: "team",
    ontologyProperty: "avnu:team",
    url: "/team",
    label: "Équipe",
    cardinality: "0..N",
    description: "Liste des membres d'une équipe et un libellé de leur fonction.",
    compatibility: [],
    //note: "",

    type: createRefType("object"),
    ref: [{ ...refMember }],
};

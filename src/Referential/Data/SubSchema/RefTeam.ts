import { RefEntityOrSchema } from "../types";
import { refMember } from "./RefMember";

export const refTeam: RefEntityOrSchema = {
    field: "team",
    ontologyProperty: "avnu:team",
    url: "/team",
    label: "Équipe",
    cardinality: "0..N",
    description: "Liste des membres d'une équipe et un libellé de leur fonction.",
    compatibility: [],
    //note: "",
    ref: [{ ...refMember }],
};

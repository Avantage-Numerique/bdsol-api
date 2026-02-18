import { RefProperty } from "../types";
import { createRefType } from "../utils";
import { refSubMeta } from "./RefSubMeta";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const refEquipmentLink: RefProperty = {
    field: "equipment",
    ontologyProperty: "avnu:equipmentLink",
    url: "/equipmentLink",
    label: "Équipement et quantité",
    cardinality: "0..N",
    description: "Fait référence à une entité Équipement et lui ajoute une quantité.",
    compatibility: [],
    //note: "",

    type: createRefType("object"),
    ref: [
        {
            field: "equipment",
            type: createRefType("reference", [EntityTypesEnum.equipment]),
            //ontologyProperty: "avnu:",
            //url: "",
            label: "Identifiant d'équipement.",
            cardinality: "0..1",
            description: "Fait référence à un équipement.",
            compatibility: [],
            //note: "",
        },
        {
            field: "qty",
            type: createRefType("number"),
            //ontologyProperty: "avnu:",
            //url: "",
            label: "Quantité",
            cardinality: "0..1",
            description: "Décris la quantité d'un équipement possédé en plusieurs exemplaires.",
            compatibility: [],
            //note: "",
        },
        { ...refSubMeta },
    ],
};

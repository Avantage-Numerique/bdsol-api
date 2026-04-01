import { refEquipmentLink } from "../RelationLinks/RefEquipmentLink";
import { RefProperty } from "../types";
import { createPrimitiveUrl, createRefType } from "../utils";
import { refSubMeta } from "./RefSubMeta";

export const refEquipmentLinkSchema: RefProperty = {
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
            ...refEquipmentLink,
            label: "Identifiant d'équipement",
            cardinality: "0..1",
            description: "Fait référence à un équipement.",
            compatibility: [],
            //note: "",
        },
        {
            field: "qty",
            type: createRefType("number"),
            ontologyProperty: "avnu:qty",
            url: createPrimitiveUrl("qty"),
            label: "Quantité",
            cardinality: "0..1",
            description: "Décris la quantité d'un équipement possédé en plusieurs exemplaires.",
            compatibility: [],
            //note: "",
        },
        { ...refSubMeta },
    ],
};

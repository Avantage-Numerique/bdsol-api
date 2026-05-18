import { refEquipmentLink } from "@ref/Data/RelationLinks/RefEquipmentLink";
import { RefProperty } from "@ref/Data/types";
import { createPrimitiveUrl, createRefType } from "@ref/Data/utils";
import { refOrder } from "@ref/Data/Properties/RefOrder";
import AvnuCompatibility from "@ref/Data/Compatibility/Avnu";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";

export const refEquipmentLinkSchema: RefProperty = {
    field: "equipment",
    ontologyProperty: "avnu:ownsInventory",
    url: "/owns-inventory",
    label: "Équipement avec une quantité",
    cardinality: "0..N",
    description: "Fait référence à une entité Équipement et lui ajoute une quantité.",
    compatibility: [AvnuCompatibility.compatibilityMessage()],
    //note: "",

    type: createRefType("object"),
    ref: [
        {
            field: "equipment",
            ...refEquipmentLink,
            label: "Identifiant d'équipement",
            cardinality: "0..1",
            description: "Fait référence à un équipement.",
            compatibility: [SchemaOrgCompatibility.getOntologyCompatibilityArray("owns")],
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
            compatibility: [AvnuCompatibility.compatibilityMessage()],
            //note: "",
        },
        { ...refOrder },
    ],
};

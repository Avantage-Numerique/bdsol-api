import { RefProperty } from "../types";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";
import DataSceneCompatibility from "@ref/Data/Compatibility/DataScene";
import { createPrimitiveUrl, createRefType } from "../utils";

export const refEquipmentName: RefProperty = {
    field: "equipmentName",
    type: createRefType("string"),
    ontologyProperty: "avnu:alternateName",
    url: createPrimitiveUrl("alternateName"),
    label: "Nom de l'équipement",
    cardinality: "0..1",
    description: "Autre nom sous lequel l'entité est également connu.",
    compatibility: [SchemaOrgCompatibility.getOntologyCompatibilityArray("alternateName")],
    //note: "",
};

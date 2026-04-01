import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefProperty } from "../types";
import { createRefType } from "../utils";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";

export const refEquipmentLink: RefProperty = {
    field: "owns-equipment",
    url: "/owns-equipment",
    ontologyProperty: "avnu:owns",
    label: "Équipements liés",
    type: createRefType("reference", [EntityTypesEnum.equipment]),
    cardinality: "0..N",
    compatibility: [SchemaOrgCompatibility.getOntologyCompatibilityArray("owns")],
    description: "Référence à un ou plusieurs equipements utilisé ou liée à l'entité.",
};

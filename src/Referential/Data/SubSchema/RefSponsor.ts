import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefProperty } from "../types";
import { createRefType } from "../utils";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";

export const refSponsor: RefProperty = {
    field: "sponsor",
    ontologyProperty: "avnu:sponsor",
    url: "/sponsor",
    label: "Partenaires du projet",
    cardinality: "0..N",
    description: "Partenaires de projet, que ce soit au niveau moral, matériel, financier ou autres.",
    compatibility: [SchemaOrgCompatibility.getOntologyCompatibilityArray("sponsor")],
    type: createRefType("reference", [EntityTypesEnum.person, EntityTypesEnum.organisation]),
    //note: "",

    ref: [],
} satisfies RefProperty;

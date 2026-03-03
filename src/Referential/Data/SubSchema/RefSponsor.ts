import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefProperty } from "../types";
import { refSubMeta } from "./RefSubMeta";
import { createPrimitiveUrl, createRefType } from "../utils";
import ArtsdataCompatibility from "@ref/Data/Compatibility/Artsdata";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";
import { refOrder } from "@ref/Data/Properties/RefOrder";

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

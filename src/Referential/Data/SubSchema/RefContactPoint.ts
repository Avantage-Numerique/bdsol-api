import { RefProperty } from "@ref/Data/types";
import { createPrimitiveUrl, createRefType } from "@ref/Data/utils";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";

export const refContactPoint: RefProperty = {
    field: "contactPoint",
    ontologyProperty: "avnu:contactPoint",
    url: "/contactpoint",
    label: "Moyen de contact",
    cardinality: "0..1",
    description: "Trois moyen de contacter une entité : courriel, téléphone et site web.",
    type: createRefType("object"),
    compatibility: [SchemaOrgCompatibility.getOntologyCompatibilityArray("ContactPoint")],

    ref: [
        {
            field: "email",
            type: createRefType("string"),
            ontologyProperty: "avnu:email",
            url: createPrimitiveUrl("email"),
            label: "Courriel",
            cardinality: "0..1",
            description: "Courriel",
            compatibility: [SchemaOrgCompatibility.getOntologyCompatibilityArray("email")],
            //note:"",
        },
        {
            field: "tel",
            type: createRefType("string"),
            ontologyProperty: "avnu:tel",
            url: createPrimitiveUrl("tel"),
            label: "Numéro de téléphone",
            cardinality: "0..1",
            description: "Numéro de téléphone",
            compatibility: [SchemaOrgCompatibility.getOntologyCompatibilityArray("telephone")],
            //note:"",
        },
        {
            field: "website",
            type: createRefType("string"),
            ontologyProperty: "avnu:website",
            url: createPrimitiveUrl("website"),
            label: "Site web",
            cardinality: "0..1",
            description: "Site web principal",
            compatibility: [SchemaOrgCompatibility.getOntologyCompatibilityArray("url")],
            note: "Pour être ajouté aussi dans une propriété sameAs à la base de l'entité.",
        },
    ],
};

import { RefProperty } from "../types";
import { createPrimitiveUrl, createRefType } from "../utils";
import { refSubMeta } from "./RefSubMeta";
import AvnuCompatibility from "@ref/Data/Compatibility/Avnu";
import { refOrder } from "@ref/Data/Properties/RefOrder";

export const refSocialHandle: RefProperty = {
    field: "url",
    ontologyProperty: "avnu:socialHandle",
    url: "/socialHandle",
    label: "Contact de réseaux sociaux",
    cardinality: "0..N",
    description: "Liens vers différent réseau sociaux et leur noms.",
    compatibility: [AvnuCompatibility.compatibilityMessage()],
    //Propriété non conforme, SocialHandle (object) != sameAs (string)
    /* {
            externalSource: {
                name: "Schema.org",
            },
            mapping: {
                externalField: "sameAs",
                ontologyProperty: "schema:sameAs",
                ontologyUri: "https://schema.org/sameAs",
            },
            documentationUrl: "https://schema.org/sameAs",
        }, */

    type: createRefType("object"),
    ref: [
        {
            field: "label",
            type: createRefType("string"),
            ontologyProperty: "avnu:label",
            url: createPrimitiveUrl("label"),
            label: "label",
            cardinality: "0..1",
            description: "Libellé du site ou du nom à afficher en lien cliquable.",
            compatibility: [],
            //note: "",
        },
        {
            field: "url",
            type: createRefType("string"),
            ontologyProperty: "avnu:url",
            url: createPrimitiveUrl("url"),
            label: "Hyperlien vers le site",
            cardinality: "0..1",
            description: "Hyperlien qui mène vers le site internet.",
            compatibility: [],
            //note: "",
        },
        { ...refOrder },
    ],
};

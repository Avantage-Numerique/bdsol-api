import { RefEntityOrSchema } from "../types";
import { refSubMeta } from "./RefSubMeta";

export const refSocialHandle: RefEntityOrSchema = {
    field: "url",
    ontologyProperty: "avnu:socialHandle",
    url: "/socialHandle",
    label: "Contact de réseaux sociaux",
    cardinality: "0..N",
    description: "Liens vers différent réseau sociaux et leur noms.",
    compatibility: [
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
    ],
    ref: [
        {
            field: "label",
            type: "string",
            //ontologyProperty: "avnu:label",
            //url:"/label",
            label: "label",
            cardinality: "0..1",
            description: "Libellé du site ou du nom à afficher en lien cliquable.",
            compatibility: [],
            //note: "",
        },
        {
            field: "url",
            type: "string",
            //ontologyProperty: "avnu:url",
            //url:"/url",
            label: "Hyperlien vers le site",
            cardinality: "0..1",
            description: "Hyperlien qui mène vers le site internet.",
            compatibility: [],
            //note: "",
        },
        { ...refSubMeta },
    ],
};

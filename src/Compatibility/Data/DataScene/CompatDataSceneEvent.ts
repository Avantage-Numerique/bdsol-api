import { CompatibilityOntology } from "../../types";
import { SameAsSchema } from "@src/Database/Schemas/SameAsSchema";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBEventToDataScene: CompatibilityOntology = {
    [EntityTypesEnum.event]: {
        "@type": "Show",
        description:
            "La classe centrale du référentiel. Elle permet de documenter ce qui relève du spectacle au sens d'œuvre mise en scène. Par contraste, cela exclut donc les éléments descriptifs des représentations.",
        external: "https://documentation.datascene.ca/references/show/",
        compatibility: {
            type: {
                fields: [],
                export: (doc) => "Show",
                description: "-",
            },
            identifier: {
                fields: ["uri", "sameAs"],
                export: (doc) => [
                    doc.uri,
                    ...doc.sameAs.map((elem: SameAsSchema) => elem.url).filter((v: string) => v),
                ],
                description: "Identification du spectacle, avec tous les identifiants connus.",
            },
            name: {
                fields: ["name"],
                export: (doc) => doc.name,
            },
            alternateName: {
                fields: ["alternateName"],
                export: (doc) => doc.alternateName,
            },
            description: {
                fields: ["description"],
                export: (doc) => [{ lang: "fr", value: doc.description }],
                description: "Description du spectacle",
            },
            shortDescription: {
                fields: ["shortDescription"],
                export: (doc) => doc.shortDescription,
                description: "Description résumée du spectacle.",
            },

            // obligatoire, à préciser
            discipline: {
                fields: [],
                export: (doc) => ({
                    type: "Term",
                    vocabulary: "datascene",
                    code: "Variete",
                    version: "1.0",
                    sequenceNumber: 1,
                }),
                description: "Identification des disciplines artistiques du spectacle.",
            },

            // obligatoire, à préciser
            audience: {
                fields: [],
                export: (doc) => ({
                    type: "Term",
                    vocabulary: "datascene",
                    code: "ToutPublics",
                    version: "1.0",
                    sequenceNumber: 1,
                }),
                description: "Identification des publics cibles du spectacle.",
            },

            // obligatoire, à préciser
            showWithoutWords: {
                fields: [],
                export: (doc) => false,
                description: "Indication à l'effet que le spectacle ne contient pas de paroles.",
            },
            // obligatoire si showWithoutWords == false
            inLanguage: {
                fields: [],
                export: (doc) => "fr",
                description:
                    "Condition particulière: si (showWithoutWords = false) alors : Les propriétés suivantes sont obligatoires : inLanguage",
            },

            mainEntityOfPage: {
                fields: ["uri"],
                export: (doc) => ({
                    type: "WebPage",
                    url: doc.uri,
                    // inLanguage: "fr", // code de langue ISO 639-1, facultatif
                }),
                description: "URL vers des pages web donnant plus d'information sur le lieu.",
            },

            //hasPerformance serait compatible avec le schedule (Représentation (Performance))
        },
    },
};

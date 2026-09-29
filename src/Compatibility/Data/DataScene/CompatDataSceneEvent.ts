import { SameAsSchema } from "@src/Database/Schemas/SameAsSchema";
import { CompatibilityOntology } from "../../types";
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
            //hasPerformance serait compatible avec le schedule (Représentation (Performance))
        },
    },
};

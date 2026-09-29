import { CompatibilityOntology } from "../../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBPlaceToDataScene: CompatibilityOntology = {
    [EntityTypesEnum.place]: {
        "@type": "Place",
        description:
            "Sert à décrire un lieu, typiquement associé à une représentation. La classe est générique et les lieux peuvent correspondre à des édifices ou à des lieux extérieurs. Il s’agit du lieu associé à une adresse, ou à des indications géographiques précises, qui serait présenté à un consommateur comme l’endroit où se présenter pour assister à une représentation.",
        external: "https://documentation.datascene.ca/references/place/",
        compatibility: {
            type: {
                fields: [],
                export: (doc) => "Place",
            },
            virtualPlace: {
                fields: [],
                export: (doc) => false,
            },
            identifier: {
                fields: ["uri"],
                export: (doc) => [doc.uri],
                description: "Identification du spectacle, avec tous les identifiants connus.",
            },
            name: {
                fields: ["name"],
                export: (doc) => [{ lang: "fr", value: doc.name }],
                description:
                    "Énumération de textes associés à un code de langue au standard ISO 639-1 (ex: fr, en, etc.)",
            },
            description: {
                fields: ["description"],
                export: (doc) => [{ lang: "fr", value: doc.description }],
                description: "Énumération de textes longs",
            },
            streetAddress: {
                fields: ["address"],
                export: (doc) => doc.address,
            },
            addressLocality: {
                fields: ["city"],
                export: (doc) => doc.city,
            },
            /* media: {
                fields: ["mainImage"],
                export: (doc) => doc.mainImage,
            }, */
        },
    },
};

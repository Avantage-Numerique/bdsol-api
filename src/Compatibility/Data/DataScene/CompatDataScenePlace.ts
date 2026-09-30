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
                description: "Constante",
            },
            virtualPlace: {
                fields: [],
                export: (doc) => false,
                description: "Pas d'équivalent, faux par défaut.",
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
            address: {
                fields: ["address", "city", "region", "mrc", "province", "postalCode", "country"],
                export: (doc) => ({
                    streetAddress: doc.address,
                    addressLocality: `${doc.city}, ${doc.region} (${doc.mrc})`, // Nom de la ville. Peut aussi contenir le nom de la municipalité ou de la localité.
                    addressRegion: doc.province, // QC
                    addressCountry: doc.country, // CAN
                    postalCode: doc.postalCode,
                }),
                description: "Sert à décrire un lieu, typiquement associé à une représentation.",
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

            // pas d'équivalent dans AVNU
            // placeAccessibility: {
            //     fields: [],
            //     export: (doc) => [],
            //     description:
            //         "Caractéristiques d'accessibilité universelle pour le lieu. Des caractéristiques supplémentaires pourraient être documentées pour la ou les salles.",
            // },

            // pas d'équivalent dans AVNU
            // hasRooms: {
            //     fields: [],
            //     export: (doc) => [],
            //     description:
            //         "Énumération des salles présentes dans le lieu. Recommandé pour les lieux contenant plusieurs salles, ou pour documenter des informations associés à la classe Salle (par exemple, les configurations possibles) dans un lieu avec une seule salle.",
            // },

            geoCoordinates: {
                fields: ["longitude", "latitude"],
                export: (doc) => ({
                    longitude: doc.longitude,
                    latitude: doc.latitude,
                }),
                description: "Coordonnées géographiques",
            },

            /* media: {
                fields: ["mainImage"],
                export: (doc) => doc.mainImage,
            }, */
        },
    },
};

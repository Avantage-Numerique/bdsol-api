import { CompatibilityOntology } from "../../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBPlaceToArtsData: CompatibilityOntology = {
    [EntityTypesEnum.place]: {
        "@type": "Place",
        description:
            "Artsdata importe la classe Place de Schema.org. Dans Schema.org, un Place est défini comme une « entité ayant une étendue physique relativement fixe ».",
        external: "https://docs.artsdata.ca/classes/place.html",
        compatibility: {
            name: {
                fields: ["name"],
                export: (doc) => doc.name,
            },
            geo: {
                fields: ["latitude", "longitude"],
                export: (doc) => ({
                    "@type": "GeoCoordinates",
                    latitude: doc.latitude,
                    longitude: doc.longitude,
                }),
            },
            address: {
                fields: ["address", "city", "region", "mrc", "province", "postalCode", "country"],
                export: (doc) => ({
                    type: "PostalAddress",
                    streetAddress: doc.address,
                    addressLocality: `${doc.city}, ${doc.region} (${doc.mrc})`, // Nom de la ville. Peut aussi contenir le nom de la municipalité ou de la localité.
                    addressRegion: doc.province, // QC
                    addressCountry: doc.country, // CAN
                    postalCode: doc.postalCode,
                }),
                description: "Sert à décrire un lieu, typiquement associé à une représentation.",
            },
            disambiguatingDescription: {
                fields: ["description"],
                export: (doc) => doc.description,
            },
            //pas de sameAs de lieux?
            /* image: {
            fields: ["mainImage"],
            export: (doc) => doc.mainImage,
            }, */
        },
    },
};

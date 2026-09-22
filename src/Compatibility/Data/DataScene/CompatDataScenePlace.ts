import { CompatibilityOntology } from "../../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBPlaceToDataScene: CompatibilityOntology = {
    [EntityTypesEnum.place]: {
        "@type": "Place",
        description:
            "Sert à décrire un lieu, typiquement associé à une représentation. La classe est générique et les lieux peuvent correspondre à des édifices ou à des lieux extérieurs.",
        external: "https://documentation.datascene.ca/references/place/",
        compatibility: {
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

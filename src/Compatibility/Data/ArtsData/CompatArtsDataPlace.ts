import { CompatibilityOntology } from "../../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBPlaceToArtsData: CompatibilityOntology = {
    [EntityTypesEnum.place]: {
        "@type": "Place",
        description:
            "Artsdata importe la classe Place de Schema.org. Dans Schema.org, un Place est défini comme une « entité ayant une étendue physique relativement fixe ».",
        external: "https://docs.artsdata.ca/classes/place.html",
        compatibility: {
            streetAddress: {
                fields: ["address"],
                export: (doc) => doc.address,
            },
            addressLocality: {
                fields: ["city"],
                export: (doc) => doc.city,
            },
            /* image: {
            fields: ["mainImage"],
            export: (doc) => doc.mainImage,
        }, */
        },
    },
};

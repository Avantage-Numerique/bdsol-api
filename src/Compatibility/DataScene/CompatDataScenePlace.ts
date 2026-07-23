import { CompatibilityOntology } from "../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBPlaceToDataScene: CompatibilityOntology = {
    [EntityTypesEnum.place]: {
        streetAddress: {
            fields: ["address"],
            source: (doc) => doc.address,
        },
        addressLocality: {
            fields: ["city"],
            source: (doc) => doc.city,
        },
        /* media: {
            fields: ["mainImage"],
            source: (doc) => doc.mainImage,
        }, */
    },
};

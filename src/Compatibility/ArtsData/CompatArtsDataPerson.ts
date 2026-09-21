import { CompatibilityOntology } from "../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBPersonToArtsData: CompatibilityOntology = {
    [EntityTypesEnum.person]: {
        "@type": "Person",
        description: "Sous classe de http://schema.org/Thing",
        external: "https://docs.artsdata.ca/classes/person.html",
        compatibility: {
            name: {
                fields: ["firstName", "lastName"],
                export: (doc) => doc.firstName + " " + doc.lastName,
            },
            alternateName: {
                fields: ["nickname"],
                export: (doc) => doc.nickname,
            },
            description: {
                fields: ["description"],
                export: (doc) => doc.description,
            },
            disambiguatingDescription: {
                fields: ["shortDescription"],
                export: (doc) => doc.shortDescription,
            },
            /* image: {
            fields: ["mainImage"],
            export: (doc) => doc.mainImage,
        }, */
        },
    },
};

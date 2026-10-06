import { CompatibilityOntology } from "../../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBPersonToArtsData: CompatibilityOntology = {
    [EntityTypesEnum.person]: {
        "@type": "Person",
        description: "Sous classe de http://schema.org/Thing",
        external: "https://docs.artsdata.ca/classes/person.html",
        compatibility: {
            name: {
                fields: ["firstName", "lastName"],
                export: (doc) => [{ "@value": doc.firstName + " " + doc.lastName, "@language": "fr" }],
            },
            alternateName: {
                fields: ["nickname"],
                export: (doc) => doc.nickname,
            },
            url: {
                fields: ["url"],
                export: (doc) => doc.contactPoint?.website?.url,
            },
            sameAs: {
                fields: ["sameAs"],
                export: (doc) => doc.sameAs?.map((elem: any) => elem.url),
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

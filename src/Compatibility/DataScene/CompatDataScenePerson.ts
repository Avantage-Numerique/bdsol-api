import { CompatibilityOntology } from "../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBPersonToDataScene: CompatibilityOntology = {
    [EntityTypesEnum.person]: {
        "@type": "Contributor",
        description:
            "Les contributeurs correspondent à des personnes physiques ou morales (compagnies, troupes, groupes…) associées à un spectacle à travers un lien de contribution.",
        external: "https://documentation.datascene.ca/references/contributor/",
        compatibility: {
            name: {
                fields: ["firstName", "lastName"],
                source: (doc) => doc.firstName + " " + doc.lastName,
                description: "Desciption de `name` pour DataScene",
            },
            description: {
                fields: ["description"],
                source: (doc) => doc.description,
            },
            shortDescription: {
                fields: ["shortDescription"],
                source: (doc) => doc.shortDescription,
            },
            /* media: {
            fields: ["mainImage"],
            source: (doc) => doc.mainImage,
        }, */
        },
    },
};

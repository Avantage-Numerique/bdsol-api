import { CompatibilityOntology } from "../../types";
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
                export: (doc) => doc.firstName + " " + doc.lastName,
                description: "Nom complet du contributeur, écrit au long.",
            },
            description: {
                fields: ["description"],
                export: (doc) => [{ lang: "fr", value: doc.description }],
            },
            shortDescription: {
                fields: ["shortDescription"],
                export: (doc) => doc.shortDescription,
            },
            alternateName: {
                fields: ["firstName", "lastName", "nickname"],
                export: (doc) =>
                    [`${doc.firstName} ${doc.lastName}`, doc.nickname]
                        .filter((v) => v)
                        .map((v) => ({ lang: "fr", value: v })),
                description: "Autres appelations parfois utilisées pour le contributeur.",
            },
            /* media: {
            fields: ["mainImage"],
            export: (doc) => doc.mainImage,
        }, */
        },
    },
};

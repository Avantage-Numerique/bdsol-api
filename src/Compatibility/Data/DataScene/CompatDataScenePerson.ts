import { CompatibilityOntology } from "../../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBPersonToDataScene: CompatibilityOntology = {
    [EntityTypesEnum.person]: {
        "@type": "Contributor",
        description:
            "Les contributeurs correspondent à des personnes physiques ou morales (compagnies, troupes, groupes…) associées à un spectacle à travers un lien de contribution.",
        external: "https://documentation.datascene.ca/references/contributor/",
        compatibility: {
            //Par défaut pour contributeur
            type: {
                fields: [],
                export: (doc) => "Contributor",
                description: "-",
            },
            //Par défaut pour person
            contributorType: {
                fields: [],
                export: (doc) => "Person",
                description: "Indication à l'effet qu'il s'agit d'une personne physique ou d'une personne morale.",
            },
            name: {
                fields: ["firstName", "lastName"],
                export: (doc) => doc.firstName + " " + doc.lastName,
                description:
                    "Nom complet du contributeur, écrit au long, de la façon dont il doit être affiché à des utilisateurs, avec la capitalisation d'usage, les accents et les espacements usuels.",
            },
            description: {
                fields: ["description"],
                export: (doc) => [{ lang: "fr", value: doc.description }],
                description: "Énumération de textes longs",
            },
            shortDescription: {
                fields: ["shortDescription"],
                export: (doc) => doc.shortDescription,
                description: "Description résumée du contributeur.",
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

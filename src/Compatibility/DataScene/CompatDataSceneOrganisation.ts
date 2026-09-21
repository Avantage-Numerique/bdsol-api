import { CompatibilityOntology } from "../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBOrganisationToDataScene: CompatibilityOntology = {
    [EntityTypesEnum.organisation]: {
        "@type": "",
        description: "",
        external: "",
        compatibility: {
            name: {
                fields: ["name"],
                export: (doc) => doc.name,
            },
            description: {
                fields: ["description"],
                export: (doc) => doc.description,
            },
            shortDescription: {
                fields: ["shortDescription"],
                export: (doc) => doc.shortDescription,
            },
            /* hasMembers: {
            fields: ["shortDescription"],
            export: (doc) => doc.team.map(), //map member?
        }, */
            /* media: {
            fields: ["mainImage"],
            export: (doc) => doc.mainImage,
        }, */
        },
    },
};

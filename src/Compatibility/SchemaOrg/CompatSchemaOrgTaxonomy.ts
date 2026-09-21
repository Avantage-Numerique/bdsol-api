import { CompatibilityOntology } from "../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBTaxonomyToSchemaOrg: CompatibilityOntology = {
    [EntityTypesEnum.taxonomy]: {
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
        },
    },
};

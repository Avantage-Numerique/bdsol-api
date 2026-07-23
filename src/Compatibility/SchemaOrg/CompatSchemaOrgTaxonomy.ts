import { CompatibilityOntology } from "../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBTaxonomyToSchemaOrg: CompatibilityOntology = {
    [EntityTypesEnum.taxonomy]: {
        "schema:name": {
            fields: ["name"],
            source: (doc) => doc.name,
        },
        "schema:description": {
            fields: ["description"],
            source: (doc) => doc.description,
        },
    },
};

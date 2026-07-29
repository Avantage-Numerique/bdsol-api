import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export enum CompatibleOntologiesEnum {
    //"AVNU" = "avnu",
    "Schemaorg" = "schema.org",
    "DataScene" = "datascene",
    "Artsdata" = "artsdata",
}

export type CompatibleEntity =
    | EntityTypesEnum.person
    | EntityTypesEnum.organisation
    | EntityTypesEnum.project
    | EntityTypesEnum.taxonomy
    | EntityTypesEnum.place
    | EntityTypesEnum.event
    | EntityTypesEnum.equipment;

export type CompatibilityEntry<TDocument = any> = {
    fields?: string[];
    source?: (doc: TDocument) => unknown;
};

export type CompatibilityProperties<TDocument = any> = Record<string, CompatibilityEntry<TDocument>>;

export type CompatibilityOntology<TDocument = any> = Partial<
    Record<CompatibleEntity, CompatibilityProperties<TDocument>>
>;

export type OntologyMetaData = {
    referentialUrl?: string;
    ontologyUrl?: string;
    contextUrl?: string;
    prefix: string;
    name?: string;
    label?: string;
    icon?: string;
    description?: string;
};

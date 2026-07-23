import { EntityTypesEnum } from "@src/Entities/EntityTypes";

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

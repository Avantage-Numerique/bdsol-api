import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export type RefItem = {
    label: string;
    url: `/${string}`;
    similarTo?: RefCompatibility[];
    description?: string;
    ref: RefField[];
};

type externalOntologies = "schema";

type RefFieldBase = {
    field?: string;
    ontologyProperty?: `an:${string}`;
    label: string;
    cardinality?: Cardinality;
    description?: string;
    compatibility?: RefCompatibility[];
    note?: string;
};

export type RefField =
    | (RefFieldBase & { type: "object"; subSchema: SchemaRef; entityRef?: never })
    | (RefFieldBase & { type: "id"; entityRef: EntityTypesEnum[]; subSchema?: never })
    | (RefFieldBase & { type: Exclude<FieldType, "object" | "id">; subSchema?: never; entityRef?: never });

export type RefData = {
    entities: Record<string, RefItem>;
    subschemas: Record<string, RefItem>;
};

export type RefCompatibility = {
    externalSource: {
        name: string;
        sparqlEndpoint?: string;
        //graph?: string;
    };
    mapping: {
        externalField: string;
        ontologyProperty?: `${externalOntologies}:${string}`;
        ontologyUri?: string;
    };
    relation?: string;
    documentationUrl?: string;
};

export type SchemaRef = {
    label: string;
    url: string;
};

export type FieldType = "string" | "number" | "boolean" | "object" | "id";
export type Cardinality = "0..1" | "1..1" | "0..N" | "1..N" | "N..N";

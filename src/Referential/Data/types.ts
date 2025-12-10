import { EntityTypesEnum } from "@src/Entities/EntityTypes";

type externalOntologies = "schema";

//Property no ref
export type RefPropertyBase = {
    field?: string; //Default field name
    ontologyProperty?: `avnu:${string}`; //our ontology property name
    url?: `/${string}`;
    label: string; //Default label
    cardinality?: Cardinality; //Default cardinality
    description?: string; //description of the property
    compatibility?: RefCompatibility[]; //compatibility to other ontologies
    note?: string; //Note
};

export type RefEntityOrSchema = RefPropertyBase & {
    ref: RefProperty[];
};

export type RefProperty =
    | (RefPropertyBase & { type: "object"; subSchema: SchemaRef; entityRef?: never })
    | (RefPropertyBase & { type: "id"; entityRef: EntityTypesEnum[]; subSchema?: never })
    | (RefPropertyBase & { type: Exclude<FieldType, "object" | "id">; subSchema?: never; entityRef?: never });

export type RefPropertyPrimitive = RefPropertyBase & { type: PrimitiveType };

export type RefData = {
    entities: Record<string, RefEntityOrSchema>;
    subschemas: Record<string, RefEntityOrSchema>;
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
    url?: `/${string}`;
};

export type PrimitiveType = "string" | "number" | "boolean";
export type FieldType = "string" | "number" | "boolean" | "object" | "id";
export type Cardinality = "0..1" | "1..1" | "0..N" | "1..N" | "N..N";

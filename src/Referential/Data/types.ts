import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { CompatibleOntologyPropertyPrefix } from "@ref/Data/Compatibility/CompatibleOntology";

//The object that structure the whole Ref tree
export type RefData = {
    entities: Record<string, RefProperty>;
    subschemas: Record<string, RefProperty>;
    properties: Record<string, RefProperty>;
    relationLinks: Record<string, RefProperty>;
    vocabularies: Record<string, RefVocabulary>;
};

//Properties no ref
export type RefPropertyBase = {
    field?: string; //Default field name
    ontologyProperty: `avnu:${string}`; //our ontology property name
    url: `/${string}`;
    label: string; //Default label
    cardinality?: Cardinality; //Default cardinality
    description?: string; //description of the property
    compatibility?: RefCompatibility[]; //compatibility to other ontologies
    note?: string; //Note
};

export type RefPropertyPrimitive = {
    [K in PrimitiveType]: RefPropertyBase & {
        type: { kind: "primitive"; name: K };
        constraints?: PrimitiveConstraintsMap[K];
        //ref?: never;
    };
}[PrimitiveType];

type RefPropertyReference = RefPropertyBase & {
    type: RefTypeReference;
    //ref?: never;
    constraints?: never;
};

export type RefPropertyObject = RefPropertyBase & {
    type: RefTypeObject;
    ref: RefProperty[];
    constraints?: never;
};

//RefProperty represent the list of entity, subschema, properties (primitive) or relationLinks
export type RefProperty = RefPropertyPrimitive | RefPropertyReference | RefPropertyObject;

export type RefCompatibility = {
    externalSource: {
        name: string;
        sparqlEndpoint?: string;
        //graph?: string;
    };
    mapping: {
        externalField: string;
        ontologyProperty?: CompatibleOntologyPropertyPrefix;
        ontologyUri?: string;
    };
    relation?: string;
    documentationUrl?: string;
    messageOnly?: string;
};

export type Cardinality = "0..1" | "1..1" | "0..N" | "1..N" | "N..N";
export type PrimitiveType = "string" | "number" | "boolean" | "date";

export type RefTypePrimitive<T extends PrimitiveType = PrimitiveType> = {
    kind: "primitive";
    name: T;
};
export type RefTypeReference = { kind: "reference"; targets: EntityTypesEnum[] };
export type RefTypeObject = { kind: "object" };
export type RefType = RefTypePrimitive | RefTypeReference | RefTypeObject;

type PrimitiveConstraintsMap = {
    string: RefStringConstraints;
    number: RefNumberConstraints;
    boolean: never;
    date: never;
};

export type RefStringConstraints = {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    enum?: Record<string, string>;
};

export type RefNumberConstraints = {
    minimum?: number;
    maximum?: number;
};

export type RefVocabulary = {
    label: string;
    name?: string; //Default field name
    field?: string;
    ontologyProperty?: string;
    description?: string; //description of the property
    apiType: "enum" | "static" | "dynamic";
    apiSource?: any; //enum ou array
    url: `/${string}`;
    compatibility?: RefCompatibility[]; //compatibility to other ontologies
    note?: string; //Note
};

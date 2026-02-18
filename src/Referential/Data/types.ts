import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { CompatibleOntologyPropertyPrefix } from "@ref/Data/Compatibility/CompatibleOntology";

//The object that structure the whole Ref tree
export type RefData = {
    entities: Record<string, RefProperty>;
    subschemas: Record<string, RefProperty>;
    properties: Record<string, RefProperty>;
    relationLinks: Record<string, RefProperty>;
};

//Properties no ref
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

//RefProperty represent the list of entity, subschema, properties (primitive) or relationLinks
export type RefProperty =
    | (RefPropertyBase & { type: RefTypePrimitive | RefTypeReference; ref?: never })
    | (RefPropertyBase & { type: RefTypeObject; ref: RefProperty[] });

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
};

export type PrimitiveType = "string" | "number" | "boolean" | "date";
export type Cardinality = "0..1" | "1..1" | "0..N" | "1..N" | "N..N";

export type RefTypePrimitive = { kind: "primitive"; name: PrimitiveType };
export type RefTypeReference = { kind: "reference"; targets: EntityTypesEnum[] };
export type RefTypeObject = { kind: "object" };
export type RefType = RefTypePrimitive | RefTypeReference | RefTypeObject;

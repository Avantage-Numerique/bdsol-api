import { EntityTypesEnum } from "@src/Entities/EntityTypes";
// import { CompatibleOntologyPropertyPrefix } from "@src/Compatibility/Compatibility/CompatibleOntology";

//The object that structure the whole Ref tree
export type RefData = {
    entities: Record<string, RefSchema>;
    subschemas: Record<string, RefSchema>;
    properties: Record<string, RefPrimitiveField>;
    relationLinks: Record<string, RefReferenceField>;
    vocabularies: Record<string, RefVocabulary>;
};

//Object that represent a schema (entity or fixed subschema)
export type RefSchema = {
    type: RefTypeObject;
    fields: Record<string, RefField>;
    //documentation: RefFieldDocumentation
};
//export type RefFieldDocumentation = {
//documentation?: RefDocumentationLink;
//label?: string;
//description?: string;
//};
//Different type of fields (primitive, reference or subschema/object)
export type RefField = RefPrimitiveField | RefObjectField | RefReferenceField;

//Properties that every fields have
export type RefFieldBase = {
    cardinality: Cardinality;
};

//Base + Primitive Field
export type RefPrimitiveField<K extends PrimitiveType = PrimitiveType> = RefFieldBase & {
    type: { kind: "primitive"; name: K };
    constraints?: RefPrimitiveConstraints<K>;
};
//Add required to primitive constraints
export type RefPrimitiveConstraints<K extends PrimitiveType> = {
    required?: boolean;
} & PrimitiveConstraintsMap[K];

//Base + Reference Field
export type RefReferenceField = RefFieldBase & {
    type: RefTypeReference;
    constraints?: { required?: boolean };
};

//Base + Object Field
export type RefObjectField = RefFieldBase & {
    type: RefTypeObject;
    fields: RefSchema["fields"];
    constraints?: RefObjectConstraints;
};

//Compatibility
export type RefCompatibility = {
    externalSource: {
        name: string;
        label: string;
        description?: string;
        sparqlEndpoint?: string;
        icon?: string;
        frontpageUrl?: string;
        //graph?: string;
    };
    mapping: {
        externalField: string;
        // ontologyProperty?: CompatibleOntologyPropertyPrefix;
        ontologyUri?: string;
    };
    relation?: string;
    documentationUrl?: string;
    messageOnly?: string;
};

//Cardinality
export type Cardinality = "0..1" | "1..1" | "0..N" | "1..N" | "N..N";
//Primitive type / litterals list
export type PrimitiveType = "string" | "number" | "boolean" | "date";

//Type
export type RefType = RefTypePrimitive | RefTypeReference | RefTypeObject;
//Type Reference
export type RefTypeReference = { kind: "reference"; targets: EntityTypesEnum[]; refPath?: string };
//Type object
export type RefTypeObject = { kind: "object" };
//Type primitive (Redondant et remplacé par RefPrimitiveField)
export type RefTypePrimitive<T extends PrimitiveType = PrimitiveType> = {
    kind: "primitive";
    name: T;
};

//Contraints
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

export type RefObjectConstraints = {
    required?: boolean;
    //immutable?: boolean;
    //unique?: boolean
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

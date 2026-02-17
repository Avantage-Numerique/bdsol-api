import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { CompatibleOntologyPropertyPrefix } from "@ref/Data/Compatibility/CompatibleOntology";

//type externalOntologies = "schema";//note: added this type CompatibleOntologyPropertyPrefix as base for that. To allow multiple Ontology compatibility.

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
    type: "object";
    ref: RefProperty[];
};

//RefProperty can have either Object and subSchema, id and entityRef, primitive types or can be another EntityOrSchema
//E.g. SkillGroup.subMeta is a RefEntityOrSchema that has a RefEntitySubSchema as a RefProperty instead of a single layer
export type RefProperty =
    | (RefPropertyBase & { type: "id"; entityRef: EntityTypesEnum[] })
    | (RefPropertyBase & { type: Exclude<FieldType, "object" | "id">; entityRef?: never })
    | RefEntityOrSchema; //Allows multilayer schema (Skillgroup.subMeta.order)

export type RefPropertyPrimitive = RefPropertyBase & { type: PrimitiveType };
export type RefPropertyRelationLink = RefPropertyBase & { type: "id"; entityRef: EntityTypesEnum[] };

export type RefData = {
    entities: Record<string, RefEntityOrSchema>;
    subschemas: Record<string, RefEntityOrSchema>;
    properties: Record<string, RefPropertyPrimitive>;
    relationLinks: Record<string, RefPropertyRelationLink>;
};

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

export type PrimitiveType = "string" | "number" | "boolean" | "date" | "list";
export type FieldType = PrimitiveType | "object" | "id";
export type Cardinality = "0..1" | "1..1" | "0..N" | "1..N" | "N..N";

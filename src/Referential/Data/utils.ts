import type {
    RefField,
    RefObjectField,
    RefPrimitiveField,
    RefSchema,
    RefType,
    RefTypeObject,
    RefTypePrimitive,
    RefTypeReference,
    PrimitiveType,
} from "./types";

import { EntityTypesEnum } from "@src/Entities/EntityTypes";

function createRefType<T extends PrimitiveType>(type: T): RefTypePrimitive<T>;
function createRefType(type: "object"): RefTypeObject;
function createRefType(type: "reference", arg: EntityTypesEnum[], refPath?: string): RefTypeReference;
function createRefType(
    type: PrimitiveType | "object" | "reference",
    arg: EntityTypesEnum[] = [],
    refPath?: string
): RefType {
    if (type === "object") {
        return { kind: "object" };
    }

    if (type === "reference") {
        return { kind: "reference", targets: arg, refPath: refPath };
    }

    return { kind: "primitive", name: type };
}

function createPrimitiveUrl(name: string): `/${string}#avnu:${string}` {
    return ("/properties#avnu:" + name) as `/${string}#avnu:${string}`;
}

function isObjectProp(field: RefField): field is RefObjectField {
    return field.type.kind === "object";
}

/* Nouvelle structure de ref brise ceci */
function getAllPrimitives(base: RefSchema): RefPrimitiveField[] {
    // HACK
    return [
        {
            cardinality: "0..N",
            type: createRefType("string"),
            //constraints : enum : badgeenum
        },
        {
            cardinality: "0..N",
            type: createRefType("string"),
            //constraints : enum : badgeenum
        },
    ];

    // const filtered: RefPrimitiveField[] = [];

    // for (const entity of base) {
    //     // Primitive branch
    //     if (entity.type?.kind === "primitive") {
    //         filtered.push(entity as RefPropertyPrimitive);
    //     }

    //     // Object branch
    //     if (isObjectProp(entity)) {
    //         filtered.push(...getAllPrimitives(entity.ref));
    //     }
    // }

    // return filtered;
}

function getAllUniquePrimitives(base: RefSchema[]) {
    return base.map(getAllPrimitives);

    // const distinctsKeys = new Set();

    // return getAllPrimitives(base).filter((item) => {
    //     if (item.ontologyProperty && distinctsKeys.has(item.ontologyProperty)) {
    //         return false;
    //     } else {
    //         distinctsKeys.add(item.ontologyProperty);
    //         return true;
    //     }
    // });
}

export { isObjectProp, createPrimitiveUrl, createRefType, getAllUniquePrimitives };

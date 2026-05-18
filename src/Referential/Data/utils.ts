import { RefProperty } from "./types";
import { refData } from "./data";
import type {
    PrimitiveType,
    RefPropertyObject,
    RefPropertyPrimitive,
    RefType,
    RefTypeObject,
    RefTypePrimitive,
    RefTypeReference,
} from "./types";

import { EntityTypesEnum } from "@src/Entities/EntityTypes";

function findEntityByURL(url: string) {
    return Object.values(refData)
        .flatMap((x) => Object.values(x).flat())
        .find((i) => `/${url}` === i.url?.toLowerCase());
}

function mapEntityByURL() {
    const routesMap: Map<string, RefProperty> = new Map();

    Object.values(refData)
        .flatMap((x) => Object.values(x))
        .forEach((v) => {
            if (v.url) routesMap.set(v.url.toLowerCase(), v);
        });

    return routesMap;
}

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
        return { kind: "reference", targets: arg, refPath };
    }

    return { kind: "primitive", name: type };
}

function createPrimitiveUrl(name: string): `/${string}#avnu:${string}` {
    return ("/properties#avnu:" + name) as `/${string}#avnu:${string}`;
}

function isObjectProp(entity: RefProperty): entity is RefPropertyObject {
    return entity.type?.kind === "object";
}

function getAllPrimitives(base: RefProperty[]): RefPropertyPrimitive[] {
    const filtered: RefPropertyPrimitive[] = [];

    for (const entity of base) {
        // Primitive branch
        if (entity.type?.kind === "primitive") {
            filtered.push(entity as RefPropertyPrimitive);
        }

        // Object branch
        if (isObjectProp(entity)) {
            filtered.push(...getAllPrimitives(entity.ref));
        }
    }

    return filtered;
}

function getAllUniquePrimitives(base: RefProperty[]) {
    const distinctsKeys = new Set();

    return getAllPrimitives(base).filter((item) => {
        if (item.ontologyProperty && distinctsKeys.has(item.ontologyProperty)) {
            return false;
        } else {
            distinctsKeys.add(item.ontologyProperty);
            return true;
        }
    });
}

export { getAllUniquePrimitives, isObjectProp, createPrimitiveUrl, createRefType, mapEntityByURL, findEntityByURL };

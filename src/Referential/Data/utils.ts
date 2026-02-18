import { refData } from "./data";
import { RefProperty } from "./types";
import type { PrimitiveType, RefType, RefTypeObject, RefTypePrimitive, RefTypeReference } from "./types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export function findEntityByURL(url: string) {
    return Object.values(refData)
        .flatMap((x) => Object.values(x).flat())
        .find((i) => `/${url}` === i.url.toLowerCase());
}

export function mapEntityByURL() {
    const routesMap: Map<string, RefProperty> = new Map();

    Object.values(refData)
        .flatMap((x) => Object.values(x))
        .forEach((v) => {
            if (v.url) routesMap.set(v.url.toLowerCase(), v);
        });

    return routesMap;
}

export function createRefType(type: PrimitiveType): RefTypePrimitive;
export function createRefType(type: "object"): RefTypeObject;
export function createRefType(type: "reference", arg: EntityTypesEnum[]): RefTypeReference;

export function createRefType(type: PrimitiveType | "object" | "reference", arg: EntityTypesEnum[] = []): RefType {
    if (type === "object") {
        return { kind: "object" } as RefTypeObject;
    }

    if (type === "reference") {
        return { kind: "reference", targets: arg } as RefTypeReference;
    }

    // otherwise it's a primitive
    return { kind: "primitive", name: type } as RefTypePrimitive;
}

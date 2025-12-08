import { refData } from "./data";
import { RefItem } from "./types";

export function findEntityByURL(url: string) {
    return Object.values(refData)
        .flatMap((x) => Object.values(x).flat())
        .find((i) => `/${url}` === i.url);
}

export function mapEntityByURL() {
    const routesMap: Map<string, RefItem> = new Map();

    Object.values(refData)
        .flatMap((x) => Object.values(x))
        .forEach((v) => {
            if (v.url) routesMap.set(v.url, v);
        });

    return routesMap;
}

import { refData } from "./data";
import { RefEntityOrSchema } from "./types";

export function findEntityByURL(url: string) {
    return Object.values(refData)
        .flatMap((x) => Object.values(x).flat())
        .find((i) => `/${url}` === i.url.toLowerCase());
}

export function mapEntityByURL() {
    const routesMap: Map<string, RefEntityOrSchema> = new Map();

    Object.values(refData)
        .flatMap((x) => Object.values(x))
        .forEach((v) => {
            if (v.url) routesMap.set(v.url.toLowerCase(), v);
        });

    return routesMap;
}

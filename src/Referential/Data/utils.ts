import { refData } from "./data";

export function findEntityByURL(url: string) {
    return Object.values(refData)
        .flatMap((x) => Object.values(x).flatMap((y) => y))
        .find((i) => `/${url}` === i.url);
}

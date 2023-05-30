//TIME Helpers
import { performance } from "perf_hooks";

/**
 * Return a now date object directly
 * Create a new instance of Date every time.
 */
export const now = ():Number => {
    return new Date().getTime();
}


export const getDurationInMilliseconds = (start:number):number => {
    return performance.now() - start;
}
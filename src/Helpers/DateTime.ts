//TIME Helpers
import {performance} from "perf_hooks";

/**
 * Return a now date object directly
 * Create a new instance of Date every time.
 */
export const now = ():number => {
    return new Date().getTime();
}

export const leadingZero = (dateNumber:number) => {
    return dateNumber >= 10 ? dateNumber : `0${dateNumber}`
}


export const getDurationInMilliseconds = (start:number):number => {
    return performance.now() - start;
}
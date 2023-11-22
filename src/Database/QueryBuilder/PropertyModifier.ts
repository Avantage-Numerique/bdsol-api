import mongoose from "mongoose";

export interface PropertyModifier {
    (value:any): any
}

export const defaultModifier:PropertyModifier = (value) => {
    return value;
}

export const objectIdModifier:PropertyModifier = (value) => {
    return new mongoose.Types.ObjectId(value);
}

/**
 * change a string to array if it has , in it.
 * @param str {string}
 */
export const stringToArrayModifier = (str:string) => {

    if (typeof str === "string" && str.includes(",")) {
        return str.split(",");
    }
    return [str];
}
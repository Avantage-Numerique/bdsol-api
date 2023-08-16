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
        console.log('str have , in it so return a split')
        return str.split(",");
    }
    console.log("return base array with direct str", str);
    return [str];
}
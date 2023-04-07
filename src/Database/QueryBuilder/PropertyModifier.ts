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
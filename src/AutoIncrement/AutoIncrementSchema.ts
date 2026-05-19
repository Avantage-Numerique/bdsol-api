import { Document } from "mongoose";

export interface AutoIncrementSchema extends Document {
    key: string;
    seq: number;
}

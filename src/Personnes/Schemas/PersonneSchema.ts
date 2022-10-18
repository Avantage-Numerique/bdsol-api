import mongoose from "mongoose";
import {Document} from "mongoose";

export interface PersonneSchema extends Document {
    lastName:string;
    firstName:string;
    slug:string;
    nickname:string;
    description:string;
    occupations:[object];
}
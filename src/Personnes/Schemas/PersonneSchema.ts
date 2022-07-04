import {Document} from "mongoose"

export interface PersonneSchema extends Document {
    lastName:string;
    firstName:string;
    nickname:string;
    description:string
}
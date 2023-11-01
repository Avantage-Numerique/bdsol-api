import {Document} from "mongoose";

export interface CommunicationSchema extends Document {
    name:string;
    email:string;
    message:string;
    date:Date;
}
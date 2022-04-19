import { Timestamp } from "bson";
import {Schema, Document} from "mongoose"
import PersonneService from "../Services/PersonneService";
/**
 *
 *
 */

export interface PersonneSchema extends Document {
    _id:Schema.Types.ObjectId;
    nom:string;
    prenom:string;
    surnom:string;
    description:string

}
/*
export const PersonneSchema = new Schema­<PersonneSchema>({
    _id: Schema.Types.ObjectId,
    nom: { type: String, required: true},
    prenom: { type: String, required: true },
    surnom: String,
    description: String
};
    {
        timestamps: true
});

*/




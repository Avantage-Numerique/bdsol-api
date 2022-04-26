import {Schema, Document} from "mongoose"

export interface PersonneSchema extends Document {
    nom:string;
    prenom:string;
    surnom:string;
    description:string
}




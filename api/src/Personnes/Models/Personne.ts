
import mongoose from "mongoose";
//import { StringMappingType } from "typescript";
//import {PersonneSchema} from "../Schemas/PersonneSchema"
import {Schema} from "mongoose"
import { PersonneSchema } from "../Schemas/PersonneSchema";
import Provider from "../../Database/Providers/Provider";
//import {UserSchema} from "../../Users/Schemas/UserSchema";


class Personne {
    
    //Attributs static
    static modelName:string = 'Personne'
    static collectionName:string = 'personnes';
    static connection:mongoose.Connection;
    static provider:Provider;

    static schema:Schema =
        new Schema<PersonneSchema>({

            //_id: Schema.Types.ObjectId,
            nom: { type: String, required: true },
            prenom: { type: String, required: true },
            surnom: String,
            description: String
        },
            {
                timestamps: true
        });

    //Attributs
    //public _id:mongoose.Types.ObjectId;
    public nom:string;
    public prenom:string;
    public surnom:string;
    public description:string;
    
    
    //Constructeur
    constructor (nom:string, prenom:string, surnom:string, description:string)
    {
        /*
        public constructor(...args: any[]) {
            if (args.length === your value) {
            // logic for your called constructor goes here..
            }
            } (
        */

        //this._id = new mongoose.Types.ObjectId();
        this.nom = nom;
        this.prenom = prenom;
        this.surnom = surnom;
        this.description = description;

    }

    //Méthodes
    public AttributsPersonneToString(): string {
        return `nom=${this.nom}, prenom=${this.prenom}, surnom=${this.nom}, description=${this.description}`;
    }

    static initSchema() {
        Personne.connection.model(Personne.modelName, Personne.schema);
        //mongoose.model(Personne.modelName, Personne.schema);
    }

    static getInstance() {

        if (Personne.connection !== null) {
            Personne.initSchema();
            return Personne.connection.model(Personne.modelName);
        }
        return null;
        //Personne.initSchema();
        //return mongoose.model(Personne.modelName);
    }
}

export default Personne;
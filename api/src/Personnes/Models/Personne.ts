
import mongoose from "mongoose";
import {Schema} from "mongoose"
import { PersonneSchema } from "../Schemas/PersonneSchema";
import Provider from "../../Database/Providers/Provider";
import {DataProvider} from "../../Database/Providers/DataProvider";
//import LogHelper from "../../Monitoring/Helpers/LogHelper";
//import {UserSchema} from "../../Users/Schemas/UserSchema";


class Personne {
    
    /** @static Nom du modèle */
    static modelName:string = 'Personne';

    /** @static Nom de la collection dans la base de donnée */
    static collectionName:string = 'personnes';

    /** @static Connection mongoose */
    static connection:mongoose.Connection;

    static provider:Provider;

    /** @static Schéma pour la base de donnée */
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

    /** @public Nom de famille de la personne */
    public nom:string;

    /** @public Prenom de la personne */
    public prenom:string;

    /** @public Surnom de la personne */
    public surnom:string;

    /** @public Description de la personne (biographie) */
    public description:string;
    
    
    /** @constructor */
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


    /**
     * @method AttributsPersonneToString Revoie les attributs de la personne en string
     * @return {string} concaténation "@attribut=@value"
     */
    public AttributsPersonneToString(): string {
        return `nom=${this.nom}, prenom=${this.prenom}, surnom=${this.nom}, description=${this.description}`;
    }

    
    /**
     * @method isNomOrPrenomValid Vérifie les conditions d'insertion dans la base de donnée d'un nom ou d'un prénom.
     * @param {string} nomOuPrenom - Nom ou prénom à valider
     * @return {boolean} isValid
     */
    static isNomOrPrenomValid(p_nom:string):boolean
    {
        //typeof p_nom !== "string" || // ça va toujours être
        // Mon IDE propose ceci : C'est assez lisible, tu en pense quoi @fred ?
        return !(p_nom === null ||
            p_nom === undefined ||
            p_nom.length < 2);

    }


    /**
     * @static method
     * @method initSchema
     */
    static initSchema() {

        if (Personne.providerIsSetup()) {
            Personne.provider.connection.model(Personne.modelName, Personne.schema);
        }
    }


    /**
     * @static method
     * @method getInstance
     */
    static getInstance() {

        Personne.provider = DataProvider.getInstance();//must have
        if (Personne.providerIsSetup()) {
            Personne.initSchema();
            return Personne.provider.connection.model(Personne.modelName);
        }
        throw new Error("Personne Provider is not setup. Can't get Personne's model");
    }


    /**
     * @static method
     * @method providerIsSetup
     * @return {boolean} isSetup
     */
    static providerIsSetup():boolean {
        return Personne.provider !== undefined && Personne.provider.connection !== undefined;
    }
}

export default Personne;
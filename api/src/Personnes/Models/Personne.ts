
import mongoose from "mongoose";
import {PersonneSchema} from "../Schemas/PersonneSchema"

class Personne {
    static modelName:string = 'Personne'

    static initSchema() {
        mongoose.model(Personne.modelName, PersonneSchema);
    }

    static getInstance(){
        Personne.initSchema();
        return mongoose.model(Personne.modelName);
    }
}

export default Personne;